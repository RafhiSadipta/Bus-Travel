const db = require('../db');

// Mendapatkan semua agen
const getAllAgen = () => {
    return db('agen').select('*');
};

// Mendapatkan agen berdasarkan ID
const getAgenById = (id) => {
    return db('agen').where({ id }).first();
};

// Menambah agen baru
const createAgen = (agenData) => {
    return db('agen').insert(agenData).returning('*');
};

// Memperbarui agen berdasarkan ID
const updateAgen = (id, updatedData) => {
    return db('agen').where({ id }).update(updatedData);
};

// Menghapus agen berdasarkan ID
const deleteAgen = (id) => {
    return db('agen').where({ id }).del();
};

module.exports = { getAllAgen, getAgenById, createAgen, updateAgen, deleteAgen };
