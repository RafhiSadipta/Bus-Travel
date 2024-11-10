const db = require('../db');

const createTransaksi = (transaksiData) => db('transaksi').insert(transaksiData).returning('*');

const getAllTransaksi = () =>
    db('transaksi')
        .select(
            'transaksi.*',
            'users.username as nama_user',  // Note: 'users' table referenced here
            'tiket.id as tiket_id',
            'kursi.kode_kursi'
        )
        .innerJoin('users', 'transaksi.id_user', 'users.id')
        .innerJoin('tiket', 'transaksi.id_tiket', 'tiket.id')
        .innerJoin('kursi', 'transaksi.id_kursi', 'kursi.id');

const updateTransaksiStatus = (id, status) => db('transaksi').where({ id }).update({ status });
const getTransaksiById = (id) =>
    db('transaksi').where({ id }).first();
const updateKursiStatus = (id_kursi, status) => db('kursi').where({ id: id_kursi }).update({ status });
const getUserTransactionsFromDB = (userId) =>
    db('transaksi')
        .select(
            'transaksi.*',
            'tiket.id as tiket_id',
            'kursi.kode_kursi'
        )
        .innerJoin('tiket', 'transaksi.id_tiket', 'tiket.id')
        .innerJoin('kursi', 'transaksi.id_kursi', 'kursi.id')
        .where('transaksi.id_user', userId);

module.exports = {
    createTransaksi,
    getAllTransaksi,
    updateTransaksiStatus,
    updateKursiStatus,
    getUserTransactionsFromDB,
    getTransaksiById,
};
