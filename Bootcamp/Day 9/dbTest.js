const sqlite = require('sqlite3');

const dbTest = new sqlite.Database(':memory:');


module.exports = dbTest;