exports.up = function (knex) {
    return knex.schema.createTable('transaksi', function (table) {
        table.increments('id').primary();
        table.integer('id_tiket').unsigned().references('id').inTable('tiket').onDelete('CASCADE');
        table.integer('id_kursi').unsigned().references('id').inTable('kursi').onDelete('CASCADE');
        table.integer('id_user').unsigned().references('id').inTable('user').onDelete('CASCADE');
        table.enum('metode_transaksi', ['qris', 'transfer_bank']).notNullable();
        table.enum('status', ['pending', 'acc', 'rejected']).defaultTo('pending');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('transaksi');
};
