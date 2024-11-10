const express = require('express');
const { generateKursi, getKursiByTiketId } = require('../controllers/kursiController');

const router = express.Router();

// Route untuk generate kursi
router.post('/generate', generateKursi);

// Route untuk mendapatkan kursi berdasarkan id_tiket
router.get('/:id_tiket', getKursiByTiketId);

module.exports = router;