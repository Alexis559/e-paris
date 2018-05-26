//DATABASE CONNECTION
const pg = require('pg');

const db = new pg.Pool({
    connectionString: "postgres://ajonaxfukxhvox:dd772bc39373b73174045c50dfea730f418e315aa6eca075f8de437b464e8829@ec2-79-125-12-48.eu-west-1.compute.amazonaws.com:5432/dajcolqqjbf1tt",
    ssl: true,
});

//we export the module to get access a the db and execute query
module.exports = {
    query: (text, params, callback) => {
        return db.query(text, params, callback)
    }
}