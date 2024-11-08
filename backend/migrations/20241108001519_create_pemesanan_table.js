exports.up = function(knex) {
    return knex.schema.createTable('pemesanan', function(table) {
      table.increments('id').primary();
      table.integer('id_jadwal').unsigned().references('id').inTable('jadwal').onDelete('CASCADE');
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.date('tanggal').notNullable();
      table.string('status').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pemesanan');
  };
  