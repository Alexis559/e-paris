//DATABASE CONNECTION
const pg = require('pg');
const url = process.env.DATABASE_URL;

const db = new pg.Pool({
    connectionString: url,
    ssl: true,
});

module.exports = {
  db: db
};
