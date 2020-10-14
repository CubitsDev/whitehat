const sqlite = require('sqlite3');

const db = new sqlite.Database(':memory:');


module.exports = db;