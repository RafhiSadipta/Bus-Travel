const { getAllTerminals, getTerminalById, createTerminal, updateTerminalById, deleteTerminalById } = require('../models/terminalModel');

const getTerminals = async (req, res) => {
    try {
        const terminals = await getAllTerminals();
        res.status(200).json(terminals);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTerminal = async (req, res) => {
    const { id } = req.params;
    try {
        const terminal = await getTerminalById(id);
        if (terminal) {
            res.status(200).json(terminal);
        } else {
            res.status(404).json({ message: 'Terminal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createTerminalHandler = async (req, res) => {
    const { nama, kota } = req.body;
    try {
        const [id] = await createTerminal({ nama, kota });
        const newTerminal = await getTerminalById(id);
        res.status(201).json({ message: 'Terminal created successfully', terminal: newTerminal });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTerminalHandler = async (req, res) => {
    const { id } = req.params;
    const { nama, kota } = req.body;
    try {
        const updated = await updateTerminalById(id, { nama, kota });
        if (updated) {
            res.status(200).json({ message: 'Terminal updated successfully' });
        } else {
            res.status(404).json({ message: 'Terminal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTerminalHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteTerminalById(id);
        if (deleted) {
            res.status(200).json({ message: 'Terminal deleted successfully' });
        } else {
            res.status(404).json({ message: 'Terminal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTerminals, getTerminal, createTerminalHandler, updateTerminalHandler, deleteTerminalHandler };
