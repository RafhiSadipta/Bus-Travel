exports.up = function (knex) {
    return knex.schema.createTable('agen', (table) => {
        table.increments('id').primary();          // ID agen
        table.string('npp').notNullable();         // NPP
        table.string('nama').notNullable();        // Nama agen
        table.string('telepon').notNullable();     // Nomor telepon
        table.string('logo');                      // Gambar/logo (path file)
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('agen');
};
