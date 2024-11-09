const db = require('../db');

const getAllTerminals = () => db('terminal').select('*');
const getTerminalById = (id) => db('terminal').where({ id }).first();
const createTerminal = (terminal) => db('terminal').insert(terminal);
const updateTerminalById = (id, terminal) => db('terminal').where({ id }).update(terminal);
const deleteTerminalById = (id) => db('terminal').where({ id }).del();

module.exports = { getAllTerminals, getTerminalById, createTerminal, updateTerminalById, deleteTerminalById };
