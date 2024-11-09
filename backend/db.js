const knex = require('knex');
const config = require('./knexfile');

// Tambahkan konfigurasi tambahan untuk menangani waktu tunggu dan mode WAL
const db = knex({
    ...config.development,
    pool: {
        afterCreate: (conn, done) => {
            // Atur waktu tunggu saat database terkunci hingga 3 detik
            conn.run('PRAGMA busy_timeout = 3000');
            // Aktifkan mode Write-Ahead Logging (WAL)
            // conn.run('PRAGMA journal_mode = WAL');
            done(null, conn);
        }
    }
});

module.exports = db;
