exports.up = function (knex) {
    return knex.schema.table('tiket', function (table) {
        table.integer('kursi_tersedia').notNullable().defaultTo(0); // Menambah kolom kursi_tersedia dengan nilai default 0
    });
};

exports.down = function (knex) {
    return knex.schema.table('tiket', function (table) {
        table.dropColumn('kursi_tersedia'); // Menghapus kolom kursi_tersedia jika migrasi dibatalkan
    });
};
