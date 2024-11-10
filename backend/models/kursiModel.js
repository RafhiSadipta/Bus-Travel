const db = require('../db');

const createKursi = (kursiData) => db('kursi').insert(kursiData);

const getKursiByTiketId = (id_tiket) => db('kursi').where({ id_tiket });

const updateKursiStatus = (kode_kursi, status) =>
    db('kursi').where({ kode_kursi }).update({ status });

module.exports = {
    createKursi,
    getKursiByTiketId,
    updateKursiStatus
};
