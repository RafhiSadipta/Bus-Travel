exports.up = function(knex) {
    return knex.schema.createTable('pembayaran', function(table) {
      table.increments('id').primary();
      table.integer('id_pemesanan').unsigned().references('id').inTable('pemesanan').onDelete('CASCADE');
      table.string('metode').notNullable();
      table.decimal('jumlah', 10, 2).notNullable();
      table.string('status').notNullable();
      table.date('tanggal').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pembayaran');
  };
  