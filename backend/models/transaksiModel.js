const db = require('../db');

const createTransaksi = (transaksiData) => db('transaksi').insert(transaksiData);
const getAllTransaksi = () => db('transaksi')
    .select('transaksi.*', 'user.nama as nama_user', 'tiket.id as tiket_id', 'kursi.kode_kursi')
    .join('user', 'transaksi.id_user', 'user.id')
    .join('tiket', 'transaksi.id_tiket', 'tiket.id')
    .join('kursi', 'transaksi.id_kursi', 'kursi.id');

const updateTransaksiStatus = (id, status) => db('transaksi').where({ id }).update({ status });
const updateKursiStatus = (id_kursi, status) => db('kursi').where({ id: id_kursi }).update({ status });

module.exports = {
    createTransaksi,
    getAllTransaksi,
    updateTransaksiStatus,
    updateKursiStatus,
};
