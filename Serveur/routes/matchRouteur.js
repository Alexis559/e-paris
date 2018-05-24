const express = require('express');
const router = express();
const db = require('../db/dbConnection');

console.log("Routeur Game");

router.get('/get', function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(
        [{
            id: 1,
            name: 'Cloud 9 vs Liquid',
            date: '20/05/2018',
            descr: 'This a match !'
        },
            {
                id: 2,
                name: 'TSM vs CLG',
                date: '23/05/2018',
                descr: 'This a match !'
            },
            {
                id: 3,
                name: 'Cloud 9 vs TSM',
                date: '22/05/2018',
                descr: 'This a match !'
            },
            {
                id: 4,
                name: 'FNC vs G2',
                date: '24/05/2018',
                descr: 'This a match !'
            }]
    ));
});

module.exports = router;