const { createTransaksi, getAllTransaksi, updateTransaksiStatus, updateKursiStatus } = require('../models/transaksiModel');

const createTransaksiHandler = async (req, res) => {
    const { id_tiket, id_kursi, id_user, metode_transaksi } = req.body;

    try {
        // Buat transaksi baru
        const newTransaksi = await createTransaksi({ id_tiket, id_kursi, id_user, metode_transaksi });

        // Update status kursi menjadi tidak tersedia (false)
        await updateKursiStatus(id_kursi, false);

        res.status(201).json({ message: 'Transaksi berhasil dibuat', transaksi: newTransaksi });
    } catch (error) {
        console.error("Error creating transaksi:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllTransaksiHandler = async (req, res) => {
    try {
        const transaksi = await getAllTransaksi();
        res.status(200).json(transaksi);
    } catch (error) {
        console.error("Error fetching transaksi:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTransaksiStatusHandler = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await updateTransaksiStatus(id, status);
        res.status(200).json({ message: 'Status transaksi berhasil diperbarui' });
    } catch (error) {
        console.error("Error updating transaksi status:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createTransaksiHandler,
    getAllTransaksiHandler,
    updateTransaksiStatusHandler,
};
