const express = require('express');
const router = express();
const db = require('../db/dbConnection');

console.log("Routeur User");

//get user
router.post('/get', function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    let login = req.body.login;
    let password = req.body.password;
    let query = 'SELECT * from public.user where "loginUser" = $1';//we're escaping values to avoid sql injection
    console.log(query);
    db.query(query, [login], function (err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result.rows));
    });
});

//add user
router.post('/add', function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    let pseudo = req.body.pseudo;
    let password = req.body.password;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let date = req.body.date;
    let mail = req.body.mail;
   // let passwordCrypt = cryptPassword(password);
    let query = 'INSERT INTO public.user ("loginUser", "nomUser", "prenomUser", "mailUser", "dateNaissance", "password", "admin") values ($1, $2, $3, $4, $5, $6, false)';//we're escaping values to avoid sql injection
    console.log(query);
    db.query(query, [pseudo, nom, prenom, mail, date, password], function (err, result) {
        if (err) throw err;
        res.end("Utilisateur créé");
    });
});


module.exports = router;