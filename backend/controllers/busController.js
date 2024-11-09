const { getAllBuses, getBusById, createBus, updateBusById, deleteBusById } = require('../models/busModel');

const getBuses = async (req, res) => {
    try {
        const buses = await getAllBuses();
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getBus = async (req, res) => {
    const { id } = req.params;
    try {
        const bus = await getBusById(id);
        if (bus) {
            res.status(200).json(bus);
        } else {
            res.status(404).json({ message: 'Bus not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createBusHandler = async (req, res) => {
    const { jenis, kapasitas, fasilitasIds } = req.body;
    try {
        const newBus = await createBus({ jenis, kapasitas }, fasilitasIds);
        res.status(201).json({ message: 'Bus created successfully', bus: newBus });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateBusHandler = async (req, res) => {
    const { id } = req.params;
    const { jenis, kapasitas, fasilitasIds } = req.body;
    try {
        const updatedBus = await updateBusById(id, { jenis, kapasitas }, fasilitasIds);
        res.status(200).json({ message: 'Bus updated successfully', bus: updatedBus });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteBusHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteBusById(id);
        res.status(200).json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getBuses, getBus, createBusHandler, updateBusHandler, deleteBusHandler };
