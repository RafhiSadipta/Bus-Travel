const express = require('express');
const { getTerminals, getTerminal, createTerminalHandler, updateTerminalHandler, deleteTerminalHandler } = require('../controllers/terminalController');

const router = express.Router();

router.get('/', getTerminals);
router.get('/:id', getTerminal);
router.post('/', createTerminalHandler);
router.put('/:id', updateTerminalHandler);
router.delete('/:id', deleteTerminalHandler);

module.exports = router;
