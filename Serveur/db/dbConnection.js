//DATABASE CONNECTION
const pg = require('pg');

const db = new pg.Pool({
    connectionString: "postgres://mdvesgbldcwafg:bf0bb14330a723c111c3da564e552b38993315c34df7ffa4e7d1036fcc76e812@ec2-54-217-214-68.eu-west-1.compute.amazonaws.com:5432/d126edqh9bdl51",
    ssl: true,
});

//we export the module to get access a the db and execute query
module.exports = {
    query: (text, params, callback) => {
        return db.query(text, params, callback)
    }
}
