const multer = require('multer');
const path = require('path');
const { getAllAgen, getAgenById, createAgen, updateAgen, deleteAgen } = require('../models/agenModel');

// Setup multer untuk upload file gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Fungsi untuk mendapatkan semua agen
const getAllAgenController = async (req, res) => {
    try {
        const agen = await getAllAgen();
        res.json(agen);
    } catch (error) {
        console.error('Error fetching agens:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk mendapatkan agen berdasarkan ID
const getAgenByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const agen = await getAgenById(id);

        if (!agen) {
            return res.status(404).json({ message: 'Agen not found' });
        }

        res.json(agen);
    } catch (error) {
        console.error('Error fetching agen by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk menambah agen baru
const createAgenController = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { npp, nama, telepon } = req.body;
        const logo = req.file ? `/uploads/${req.file.filename}` : null;

        const [newAgen] = await createAgen({ npp, nama, telepon, logo });
        res.status(201).json({ message: 'Agen created successfully', newAgen });
    } catch (error) {
        console.error('Error creating agen:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk memperbarui agen
const updateAgenController = async (req, res) => {
    try {
        const { id } = req.params;
        const { npp, nama, telepon } = req.body;
        const logo = req.file ? `/uploads/${req.file.filename}` : req.body.logo;

        await updateAgen(id, { npp, nama, telepon, logo });
        res.status(200).json({ message: 'Agen updated successfully' });
    } catch (error) {
        console.error('Error updating agen:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk menghapus agen
const deleteAgenController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteAgen(id);
        res.status(200).json({ message: 'Agen deleted successfully' });
    } catch (error) {
        console.error('Error deleting agen:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllAgenController,
    getAgenByIdController,
    createAgenController,
    updateAgenController,
    deleteAgenController,
    upload
};
