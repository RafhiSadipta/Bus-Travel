const { getAllFasilitas, getFasilitasById, createFasilitas, updateFasilitasById, deleteFasilitasById } = require('../models/fasilitasModel');

const getFasilitas = async (req, res) => {
    try {
        const fasilitas = await getAllFasilitas();
        res.status(200).json(fasilitas);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getFasilitasByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const fasilitas = await getFasilitasById(id);
        if (fasilitas) {
            res.status(200).json(fasilitas);
        } else {
            res.status(404).json({ message: 'Fasilitas not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createFasilitasHandler = async (req, res) => {
    const { nama, deskripsi } = req.body;
    try {
        const [id] = await createFasilitas({ nama, deskripsi });
        const newFasilitas = await getFasilitasById(id);
        res.status(201).json({ message: 'Fasilitas created successfully', fasilitas: newFasilitas });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateFasilitasHandler = async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;
    try {
        const updated = await updateFasilitasById(id, { nama, deskripsi });
        if (updated) {
            res.status(200).json({ message: 'Fasilitas updated successfully' });
        } else {
            res.status(404).json({ message: 'Fasilitas not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteFasilitasHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteFasilitasById(id);
        if (deleted) {
            res.status(200).json({ message: 'Fasilitas deleted successfully' });
        } else {
            res.status(404).json({ message: 'Fasilitas not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getFasilitas, getFasilitasByIdHandler, createFasilitasHandler, updateFasilitasHandler, deleteFasilitasHandler };
