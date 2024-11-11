const db = require('../db');

// Mengambil semua tiket dengan detail agen, bus, dan rute
const getAllTikets = async () => {
    return db('tiket')
        .select(
            'tiket.*',
            'agen.nama as nama_agen',
            'agen.logo as logo',
            'bus.jenis as jenis_bus',
            'awal.nama as terminal_awal_nama',
            'awal.kota as terminal_awal_kota',
            'akhir.nama as terminal_akhir_nama',
            'akhir.kota as terminal_akhir_kota',
            'tiket.kursi_tersedia'
        )
        .join('agen', 'tiket.id_agen', 'agen.id')
        .join('bus', 'tiket.id_bus', 'bus.id')
        .join('rute', 'tiket.id_rute', 'rute.id')
        .join('terminal as awal', 'rute.id_terminal_awal', 'awal.id')
        .join('terminal as akhir', 'rute.id_terminal_akhir', 'akhir.id');
};



const getTiketById = (id) => {
    return db('tiket')
        .select(
            'tiket.*',
            'agen.nama as nama_agen',
            'agen.logo as logo',
            'bus.jenis as jenis_bus',
            'awal.nama as terminal_awal_nama',
            'awal.kota as terminal_awal_kota',
            'akhir.nama as terminal_akhir_nama',
            'akhir.kota as terminal_akhir_kota'
        )
        .join('agen', 'tiket.id_agen', 'agen.id')
        .join('bus', 'tiket.id_bus', 'bus.id')
        .join('rute', 'tiket.id_rute', 'rute.id')
        .join('terminal as awal', 'rute.id_terminal_awal', 'awal.id')
        .join('terminal as akhir', 'rute.id_terminal_akhir', 'akhir.id')
        .where('tiket.id', id)
        .first();
};


const createTiket = (tiketData) => db('tiket').insert(tiketData);

const updateTiketById = (id, tiketData) => db('tiket').where({ id }).update(tiketData);

const deleteTiketById = (id) => db('tiket').where({ id }).del();

const getTiketsByRuteId = (ruteId, tanggal) => {
    let query = db('tiket')
        .select(
            'tiket.*',
            'agen.nama as nama_agen',
            'bus.jenis as jenis_bus',
            'awal.nama as terminal_awal_nama',
            'awal.kota as terminal_awal_kota',
            'akhir.nama as terminal_akhir_nama',
            'akhir.kota as terminal_akhir_kota'
        )
        .join('agen', 'tiket.id_agen', 'agen.id')
        .join('bus', 'tiket.id_bus', 'bus.id')
        .join('rute', 'tiket.id_rute', 'rute.id')
        .join('terminal as awal', 'rute.id_terminal_awal', 'awal.id')
        .join('terminal as akhir', 'rute.id_terminal_akhir', 'akhir.id')
        .where('tiket.id_rute', ruteId);

    if (tanggal) {
        query = query.whereRaw("DATE(tiket.waktu_berangkat) = ?", [tanggal]);
    }

    return query;
};

module.exports = {
    getAllTikets,
    getTiketById,
    createTiket,
    updateTiketById,
    deleteTiketById,
    getTiketsByRuteId,
};
