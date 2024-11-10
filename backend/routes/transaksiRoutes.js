const express = require('express');
const { createTransaksiHandler, getAllTransaksiHandler, updateTransaksiStatusHandler } = require('../controllers/transaksiController');

const router = express.Router();

router.post('/', createTransaksiHandler);
router.get('/', getAllTransaksiHandler);
router.put('/:id', updateTransaksiStatusHandler);

module.exports = router;
