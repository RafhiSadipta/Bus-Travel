const { getAllTikets, getTiketById, createTiket, updateTiketById, deleteTiketById } = require('../models/tiketModel');
const { getBusById } = require('../models/busModel');

const getTikets = async (req, res) => {
    try {
        const tikets = await getAllTikets();
        console.log("Tikets fetched:", tikets); // Log data tiket yang diambil
        res.status(200).json(tikets);
    } catch (error) {
        console.error("Error fetching tikets:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


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

const createTiketHandler = async (req, res) => {
    const { id_agen, id_bus, id_rute, waktu_berangkat, estimasi_sampai, harga } = req.body;

    try {
        // Ambil data bus berdasarkan id_bus untuk mendapatkan kapasitas
        const bus = await getBusById(id_bus);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Buat tiket dengan kursi_tersedia yang disetel sesuai kapasitas bus
        const newTiket = await createTiket({
            id_agen,
            id_bus,
            id_rute,
            waktu_berangkat,
            estimasi_sampai,
            harga,
            kursi_tersedia: bus.kapasitas, // Setel kursi_tersedia sama dengan kapasitas bus
        });

        res.status(201).json({ message: 'Tiket created successfully', tiket: newTiket });
    } catch (error) {
        console.error("Error creating tiket:", error); // Log error di backend
        res.status(500).json({ message: 'Server error' });
    }
};


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

const deleteTiketHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTiketById(id);
        res.status(200).json({ message: 'Tiket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTikets, getTiket, createTiketHandler, updateTiketHandler, deleteTiketHandler };
