const express = require('express');
const { createTransaksiHandler, getAllTransaksiHandler, updateTransaksiStatusHandler, getUserTransactions } = require('../controllers/transaksiController');

const router = express.Router();

router.post('/', createTransaksiHandler);
router.get('/', getAllTransaksiHandler);
router.put('/:id', updateTransaksiStatusHandler);
router.get('/user/:id', getUserTransactions);

module.exports = router;
