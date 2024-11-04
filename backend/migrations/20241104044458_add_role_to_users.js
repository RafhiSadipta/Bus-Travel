exports.up = function (knex) {
    return knex.schema.table('users', (table) => {
        table.string('role').defaultTo('user'); // Menambah kolom 'role' dengan nilai default 'user'
    });
};

exports.down = function (knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('role'); // Hapus kolom 'role' jika rollback
    });
};

