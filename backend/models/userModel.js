const db = require('../db');

const findUserByEmail = (email) => db('users').where({ email }).first();
const findUserById = (id) => db('users').where({ id }).first();
const createUser = (user) => db('users').insert(user);

module.exports = { findUserByEmail, findUserById, createUser };
