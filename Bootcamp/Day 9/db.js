const sqlite = require('sqlite3');

const db = new sqlite.Database('./db.db');





module.exports = db;