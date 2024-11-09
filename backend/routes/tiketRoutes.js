const express = require('express');
const {
    getTikets,
    getTiket,
    createTiketHandler,
    updateTiketHandler,
    deleteTiketHandler
} = require('../controllers/tiketController');

const router = express.Router();

router.get('/', getTikets);
router.get('/:id', getTiket);
router.post('/', createTiketHandler);
router.put('/:id', updateTiketHandler);
router.delete('/:id', deleteTiketHandler);

module.exports = router;
