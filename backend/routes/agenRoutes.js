const express = require('express');
const {
    getAllAgenController,
    getAgenByIdController,
    createAgenController,
    updateAgenController,
    deleteAgenController,
    upload
} = require('../controllers/agenController');

const router = express.Router();

router.get('/', getAllAgenController); // Mendapatkan semua agen
router.get('/:id', getAgenByIdController); // Mendapatkan agen berdasarkan ID
router.post('/', upload.single('logo'), createAgenController); // Menambahkan agen baru
router.put('/:id', upload.single('logo'), updateAgenController); // Memperbarui agen
router.delete('/:id', deleteAgenController); // Menghapus agen berdasarkan ID

module.exports = router;
