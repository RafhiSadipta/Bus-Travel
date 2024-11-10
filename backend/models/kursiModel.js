// kursiModel.js
const db = require('../db');

const createKursi = (kursiData) => db('kursi').insert(kursiData);

// Update this function to only retrieve available seats
const getAvailableKursiByTiketId = (id_tiket) =>
    db('kursi')
        .where({ id_tiket: id_tiket, status: true });

const updateKursiStatus = (id_kursi, status) =>
    db('kursi').where({ id: id_kursi }).update({ status });

module.exports = {
    createKursi,
    getAvailableKursiByTiketId,
    updateKursiStatus
};
