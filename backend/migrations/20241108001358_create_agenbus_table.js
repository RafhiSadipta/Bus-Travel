exports.up = function(knex) {
    return knex.schema.createTable('agenbus', function(table) {
      table.increments('id').primary();
      table.string('npp').notNullable().unique();
      table.string('nama').notNullable();
      table.integer('telepon').notNullable().unique();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('agenbus');
  };
  