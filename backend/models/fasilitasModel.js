const db = require('../db');

const getAllFasilitas = () => db('fasilitas').select('*');
const getFasilitasById = (id) => db('fasilitas').where({ id }).first();
const createFasilitas = (fasilitas) => db('fasilitas').insert(fasilitas);
const updateFasilitasById = (id, fasilitas) => db('fasilitas').where({ id }).update(fasilitas);
const deleteFasilitasById = (id) => db('fasilitas').where({ id }).del();

module.exports = { getAllFasilitas, getFasilitasById, createFasilitas, updateFasilitasById, deleteFasilitasById };
