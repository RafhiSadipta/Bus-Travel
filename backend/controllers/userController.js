const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { findUserByEmail, findUserById, createUser } = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { email, username, password, role = 'user' } = req.body; // Menambahkan role dengan default 'user'

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [userId] = await createUser({ email, username, password: hashedPassword, role }); // Menyimpan role saat membuat user

        const newUser = await findUserById(userId);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET); // Sertakan role dalam token
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await db('users').select('id', 'username', 'email', 'role'); // Ambil role saat mendapatkan data pengguna
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await db('users').where({ id }).del();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body; // Tambahkan role di sini

        // Update data user di database
        const updated = await db('users')
            .where({ id })
            .update({ username, email, role }); // Sertakan role saat memperbarui data

        if (updated) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login, getAllUsers, deleteUserById, updateUserById };
