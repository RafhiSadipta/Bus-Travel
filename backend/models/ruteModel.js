const db = require('../db');

const getAllRutes = () =>
    db('rute')
        .select(
            'rute.id',
            'awal.nama as terminal_awal_nama',
            'awal.kota as terminal_awal_kota',
            'akhir.nama as terminal_akhir_nama',
            'akhir.kota as terminal_akhir_kota'
        )
        .join('terminal as awal', 'rute.id_terminal_awal', 'awal.id')
        .join('terminal as akhir', 'rute.id_terminal_akhir', 'akhir.id');
const getRuteById = (id) => db('rute').where({ id }).first();
const createRute = (rute) => db('rute').insert(rute);
const updateRuteById = (id, rute) => db('rute').where({ id }).update(rute);
const deleteRuteById = (id) => db('rute').where({ id }).del();

module.exports = { getAllRutes, getRuteById, createRute, updateRuteById, deleteRuteById };
