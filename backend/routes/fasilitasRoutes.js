const express = require('express');
const {
    getFasilitas,
    getFasilitasByIdHandler,
    createFasilitasHandler,
    updateFasilitasHandler,
    deleteFasilitasHandler
} = require('../controllers/fasilitasController');

const router = express.Router();

router.get('/', getFasilitas);
router.get('/:id', getFasilitasByIdHandler);
router.post('/', createFasilitasHandler);
router.put('/:id', updateFasilitasHandler);
router.delete('/:id', deleteFasilitasHandler);

module.exports = router;
