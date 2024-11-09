const express = require('express');
const { getRutes, getRute, createRuteHandler, updateRuteHandler, deleteRuteHandler } = require('../controllers/ruteController');

const router = express.Router();

router.get('/', getRutes);
router.get('/:id', getRute);
router.post('/', createRuteHandler);
router.put('/:id', updateRuteHandler);
router.delete('/:id', deleteRuteHandler);

module.exports = router;
