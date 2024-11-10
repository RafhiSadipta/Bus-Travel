const { getAllTikets, getTiketById, createTiket, updateTiketById, deleteTiketById, getTiketsByRuteId } = require('../models/tiketModel');
const { findRuteByKeberangkatanTujuan } = require('../models/ruteModel');
const { getBusById } = require('../models/busModel');
const db = require('../db');

const searchTiket = async (req, res) => {
    const { keberangkatan, tujuan, tanggal } = req.query;
    console.log("Search parameters:", { keberangkatan, tujuan, tanggal });

    try {
        const ruteResults = await findRuteByKeberangkatanTujuan(keberangkatan, tujuan);

        if (ruteResults.length === 0) {
            return res.status(404).json({ message: 'Route not found' });
        }

        const ruteId = ruteResults[0].id;
        const tikets = await getTiketsByRuteId(ruteId, tanggal);

        if (tikets.length > 0) {
            res.status(200).json(tikets);
        } else {
            res.status(404).json({ message: 'No tickets found' });
        }
    } catch (error) {
        console.error("Error searching tiket:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi mendapatkan semua tiket
const getTikets = async (req, res) => {
    try {
        const tikets = await getAllTikets();
        console.log("Tikets fetched:", tikets);
        res.status(200).json(tikets);
    } catch (error) {
        console.error("Error fetching tikets:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi mendapatkan tiket berdasarkan ID
const getTiket = async (req, res) => {
    const { id } = req.params;
    try {
        const tiket = await getTiketById(id);
        if (tiket) {
            res.status(200).json(tiket);
        } else {
            res.status(404).json({ message: 'Tiket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi pembuatan tiket
const createTiketHandler = async (req, res) => {
    const { id_agen, id_bus, id_rute, waktu_berangkat, estimasi_sampai, harga } = req.body;

    try {
        const bus = await getBusById(id_bus);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        const newTiket = await createTiket({
            id_agen,
            id_bus,
            id_rute,
            waktu_berangkat,
            estimasi_sampai,
            harga,
            kursi_tersedia: bus.kapasitas,
        });

        res.status(201).json({ message: 'Tiket created successfully', tiket: newTiket });
    } catch (error) {
        console.error("Error creating tiket:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi pembaruan tiket
const updateTiketHandler = async (req, res) => {
    const { id } = req.params;
    const { id_agen, id_bus, id_rute, waktu_berangkat, estimasi_sampai, harga } = req.body;
    try {
        const updated = await updateTiketById(id, { id_agen, id_bus, id_rute, waktu_berangkat, estimasi_sampai, harga });
        res.status(200).json({ message: 'Tiket updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi penghapusan tiket
const deleteTiketHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTiketById(id);
        res.status(200).json({ message: 'Tiket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTikets, getTiket, createTiketHandler, updateTiketHandler, deleteTiketHandler, searchTiket };
