const express = require('express');
const router = express();
const db = require('../db/dbConnection');

console.log("Routeur Game");

router.get('/get', function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    db.query("SELECT * from public.game;", function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result.rows));
    });
});

module.exports = router;