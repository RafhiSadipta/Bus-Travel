exports.up = function (knex) {
    return knex.schema
        // Tabel bus
        .createTable('bus', function (table) {
            table.increments('id').primary(); // ID bus sebagai primary key
            table.string('jenis').notNullable(); // Jenis bus (eksekutif, sleeper, dll.)
            table.integer('kapasitas').notNullable(); // Kapasitas bus
        })
        // Tabel bus_fasilitas untuk relasi banyak-ke-banyak antara bus dan fasilitas
        .createTable('bus_fasilitas', function (table) {
            table.increments('id').primary(); // ID relasi sebagai primary key
            table.integer('bus_id').unsigned().notNullable().references('id').inTable('bus').onDelete('CASCADE'); // Foreign key ke tabel bus
            table.integer('fasilitas_id').unsigned().notNullable().references('id').inTable('fasilitas').onDelete('CASCADE'); // Foreign key ke tabel fasilitas
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('bus_fasilitas') // Hapus tabel bus_fasilitas terlebih dahulu karena bergantung pada bus dan fasilitas
        .dropTableIfExists('bus'); // Hapus tabel bus
};
