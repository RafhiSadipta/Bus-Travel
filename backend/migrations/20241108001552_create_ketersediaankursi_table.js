exports.up = function(knex) {
    return knex.schema.createTable('ketersediaankursi', function(table) {
      table.increments('id').primary();
      table.integer('id_jadwal').unsigned().notNullable().references('id').inTable('jadwal').onDelete('CASCADE');
      table.string('nomor').notNullable();
      table.string('status').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ketersediaankursi');
  };
  