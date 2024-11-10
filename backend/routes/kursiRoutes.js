const express = require('express');
const { generateKursi, getKursiByTiketId, getAvailableKursi } = require('../controllers/kursiController');

const router = express.Router();

// Route untuk generate kursi
router.post('/generate', generateKursi);

// Route untuk mendapatkan kursi berdasarkan id_tiket
router.get('/:id_tiket', getKursiByTiketId);

router.get('/available/:id_tiket', getAvailableKursi);

module.exports = router;
