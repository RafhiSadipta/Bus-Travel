exports.up = function (knex) {
    return knex.schema.createTable('kursi', function (table) {
        table.increments('id').primary();
        table.string('kode_kursi').notNullable();
        table.integer('id_tiket').unsigned().references('id').inTable('tiket').onDelete('CASCADE');
        table.boolean('status').defaultTo(true); // true untuk tersedia, false untuk tidak tersedia
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('kursi');
};
