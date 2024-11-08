exports.up = function (knex) {
    return knex.schema.createTable('terminal', (table) => {
        table.increments('id').primary();
        table.string('nama').unique().notNullable();
        table.string('kota').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('terminal');
};

