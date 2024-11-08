exports.up = function(knex) {
    return knex.schema.createTable('rute', function(table) {
      table.increments('id').primary();
      table.integer('id_terminal_awal').unsigned().references('id').inTable('terminal').onDelete('CASCADE');
      table.integer('id_terminal_akhir').unsigned().references('id').inTable('terminal').onDelete('CASCADE');
      table.integer('durasi').notNullable();
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rute');
};

  