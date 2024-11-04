const express = require('express');
const { getAllUsers, deleteUserById, updateUserById } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers); // Route untuk mendapatkan semua user
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);

module.exports = router;
