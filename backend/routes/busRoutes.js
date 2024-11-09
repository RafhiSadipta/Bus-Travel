const express = require('express');
const {
    getBuses,
    getBus,
    createBusHandler,
    updateBusHandler,
    deleteBusHandler,
} = require('../controllers/busController');

const router = express.Router();

router.get('/', getBuses);
router.get('/:id', getBus);
router.post('/', createBusHandler);
router.put('/:id', updateBusHandler);
router.delete('/:id', deleteBusHandler);

module.exports = router;
