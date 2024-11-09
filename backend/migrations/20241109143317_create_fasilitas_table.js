exports.up = function (knex) {
    return knex.schema.createTable('fasilitas', function (table) {
        table.increments('id').primary();  // Kolom ID sebagai primary key
        table.string('nama').notNullable(); // Nama fasilitas (misal: AC, TV, Wi-Fi, Recliner Seat)
        table.string('deskripsi').nullable(); // Deskripsi fasilitas (misal: Detail tentang fasilitas)
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('fasilitas');
};
