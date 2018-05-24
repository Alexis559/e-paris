//DATABASE CONNECTION
const pg = require('pg');

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

//we export the module to get access a the db and execute query
module.exports = {
    query: (text, params, callback) => {
        return db.query(text, params, callback)
    }
}