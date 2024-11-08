exports.up = function(knex) {
    return knex.schema.createTable('promo', function(table) {
      table.increments('id').primary();
      table.decimal('diskon', 5, 2).notNullable();
      table.date('periode').notNullable();
      table.string('deskripsi');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('promo');
  };
  