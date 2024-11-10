const { getTiketById } = require('../models/tiketModel');
const { createKursi } = require('../models/kursiModel');
const db = require('../db');

// Fungsi untuk generate kursi berdasarkan tiket
const generateKursi = async (req, res) => {
    const { id_tiket } = req.body;

    try {
        // Ambil detail tiket dan kapasitas bus
        const tiket = await getTiketById(id_tiket);
        if (!tiket) {
            return res.status(404).json({ message: 'Tiket not found' });
        }

        // Dapatkan kapasitas bus dari tiket
        const kapasitas = tiket.kursi_tersedia;
        const kursiCodes = generateKursiCodes(kapasitas);

        // Buat data kursi berdasarkan kapasitas bus
        const kursiData = kursiCodes.map(kodeKursi => ({
            kode_kursi: kodeKursi,
            id_tiket: id_tiket,
            status: true,
        }));

        // Simpan data kursi ke tabel `kursi`
        await createKursi(kursiData);

        res.status(201).json({ message: 'Kursi generated successfully' });
    } catch (error) {
        console.error("Error generating kursi:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk generate kode kursi
const generateKursiCodes = (kapasitas) => {
    const rows = 'ABCDEFGH';
    let kursiCodes = [];
    let currentRow = 1;

    for (let i = 0; i < kapasitas; i++) {
        const seatPosition = i % 4; // Posisi A, B, C, D untuk setiap baris
        const kodeKursi = `${currentRow}${rows[seatPosition]}`;
        kursiCodes.push(kodeKursi);

        if (seatPosition === 3) currentRow++; // Pindah ke baris berikutnya setiap 4 kursi
    }

    return kursiCodes;
};

const getKursiByTiketId = async (req, res) => {
    const { id_tiket } = req.params;

    try {
        // Ambil semua kursi berdasarkan id_tiket
        const kursi = await db('kursi').where({ id_tiket: id_tiket });
        res.status(200).json(kursi);
    } catch (error) {
        console.error("Error fetching kursi:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { generateKursi, getKursiByTiketId };
