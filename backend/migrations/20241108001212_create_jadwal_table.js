exports.up = function(knex) {
    return knex.schema.createTable('jadwal', function(table) {
      table.increments('id').primary();
      table.integer('id_rute').unsigned().references('id').inTable('rute').onDelete('CASCADE');
      table.time('waktu_keberangkatan').notNullable();
      table.time('waktu_kedatangan').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('jadwal');
  };
  