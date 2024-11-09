exports.up = function (knex) {
    return knex.schema.table('rute', function (table) {
        table.dropColumn('durasi');
    });
};

exports.down = function (knex) {
    return knex.schema.table('rute', function (table) {
        table.integer('durasi').notNullable();
    });
};
