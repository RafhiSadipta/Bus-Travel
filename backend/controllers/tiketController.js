const { getAllTikets, getTiketById, createTiket, updateTiketById, deleteTiketById, getTiketsByRuteId } = require('../models/tiketModel');
const { findRuteByKeberangkatanTujuan } = require('../models/ruteModel');
const { getBusById } = require('../models/busModel');
const db = require('../db');

// Fungsi pencarian tiket berdasarkan keberangkatan, tujuan, dan tanggal
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

// Fungsi untuk mendapatkan semua tiket
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

// Fungsi untuk mendapatkan tiket berdasarkan ID
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

// Fungsi untuk membuat tiket baru
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
            kursi_tersedia: bus.kapasitas,  // Kursi yang tersedia berdasarkan kapasitas bus
        });

        res.status(201).json({ message: 'Tiket created successfully', tiket: newTiket });
    } catch (error) {
        console.error("Error creating tiket:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk memperbarui tiket
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

// Fungsi untuk menghapus tiket
const deleteTiketHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTiketById(id);
        res.status(200).json({ message: 'Tiket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk memesan tiket dan mengurangi jumlah kursi yang tersedia
const pesanTiket = async (req, res) => {
    const { id_tiket } = req.body;  // ID tiket yang dipesan

    try {
        // Ambil tiket berdasarkan ID
        const tiket = await getTiketById(id_tiket);

        if (!tiket) {
            return res.status(404).json({ message: 'Tiket not found' });
        }

        // Periksa apakah kursi masih tersedia
        if (tiket.kursi_tersedia <= 0) {
            return res.status(400).json({ message: 'No available seats' });
        }

        // Kurangi jumlah kursi yang tersedia
        const updatedTiket = await db('tikets')
            .where({ id: id_tiket })
            .update({ kursi_tersedia: tiket.kursi_tersedia - 1 });

        if (updatedTiket) {
            res.status(200).json({ message: 'Tiket berhasil dipesan', tiket: { ...tiket, kursi_tersedia: tiket.kursi_tersedia - 1 } });
        } else {
            res.status(500).json({ message: 'Error updating ticket' });
        }
    } catch (error) {
        console.error("Error processing ticket order:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getTikets,
    getTiket,
    createTiketHandler,
    updateTiketHandler,
    deleteTiketHandler,
    searchTiket,
    pesanTiket  // Export fungsi pesanTiket yang baru
};
