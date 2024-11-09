exports.up = function (knex) {
    return knex.schema.createTable('tiket', function (table) {
        table.increments('id').primary(); // ID tiket sebagai primary key

        // Relasi ke tabel agen
        table.integer('id_agen').unsigned().notNullable()
            .references('id').inTable('agen')
            .onDelete('CASCADE');

        // Relasi ke tabel bus
        table.integer('id_bus').unsigned().notNullable()
            .references('id').inTable('bus')
            .onDelete('CASCADE');

        // Relasi ke tabel rute
        table.integer('id_rute').unsigned().notNullable()
            .references('id').inTable('rute')
            .onDelete('CASCADE');

        // Kolom waktu berangkat dan estimasi sampai
        table.datetime('waktu_berangkat').notNullable();
        table.datetime('estimasi_sampai').notNullable();

        // Kolom harga tiket
        table.integer('harga').notNullable(); // Harga dalam satuan rupiah tanpa desimal

        table.timestamps(true, true); // Kolom created_at dan updated_at otomatis
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tiket');
};
