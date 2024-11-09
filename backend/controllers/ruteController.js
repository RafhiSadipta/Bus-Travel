const { getAllRutes, getRuteById, createRute, updateRuteById, deleteRuteById } = require('../models/ruteModel');

const getRutes = async (req, res) => {
    try {
        const rutes = await getAllRutes();
        res.status(200).json(rutes);
    } catch (error) {
        console.error("Error fetching rutes:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getRute = async (req, res) => {
    const { id } = req.params;
    try {
        const rute = await getRuteById(id);
        if (rute) {
            res.status(200).json(rute);
        } else {
            res.status(404).json({ message: 'Rute not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createRuteHandler = async (req, res) => {
    const { id_terminal_awal, id_terminal_akhir } = req.body;

    if (!id_terminal_awal || !id_terminal_akhir) {
        return res.status(400).json({ message: 'Both terminals are required.' });
    }

    try {
        const [id] = await createRute({ id_terminal_awal, id_terminal_akhir });
        const newRute = await getRuteById(id);
        res.status(201).json({ message: 'Rute created successfully', rute: newRute });
    } catch (error) {
        console.error("Error in createRuteHandler:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateRuteHandler = async (req, res) => {
    const { id } = req.params;
    const { id_terminal_awal, id_terminal_akhir } = req.body;
    try {
        const updated = await updateRuteById(id, { id_terminal_awal, id_terminal_akhir });
        if (updated) {
            res.status(200).json({ message: 'Rute updated successfully' });
        } else {
            res.status(404).json({ message: 'Rute not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteRuteHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteRuteById(id);
        if (deleted) {
            res.status(200).json({ message: 'Rute deleted successfully' });
        } else {
            res.status(404).json({ message: 'Rute not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getRutes, getRute, createRuteHandler, updateRuteHandler, deleteRuteHandler };
