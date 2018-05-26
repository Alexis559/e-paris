const express = require('express');
const router = express();
const db = require('../db/dbConnection');
const utils = require('../auth/auth');


console.log("Routeur User");

//get user
router.post('/login', function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    let query = 'SELECT * from public.user where "loginUser" = $1';//we're escaping values to avoid sql injection
    console.log(query);
    db.query(query, [login], function (err, result) {
        if (err) throw err;
        if(utils().compareSync(password, result.rows[0].password)){
            const payload = {
                admin: result.rows[0].admin,
                login: result.rows[0].loginUser
            };
            var token = utils().createToken(payload);
            // return the information including token as JSON
            res.status(200).json({
                success: true,
                message: 'User connected!',
                token: token
            });
        }else{
            res.status(401).json({
                success: false,
                message: 'user not found',
                token: null
            });
        }
    });
});

router.get('/get')

//add user
router.post('/add', function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    let pseudo = req.body.pseudo;
    let password = req.body.password;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let date = req.body.date;
    let mail = req.body.mail;
    let passwordCrypt = utils().cryptPassword(password);
    if (userExist(pseudo).rows[0] !=== undefined){
      res.status(409).json({
        message: 'Ce login est déjà utilisé !',
      });
    }
    let query = 'INSERT INTO public.user ("loginUser", "nomUser", "prenomUser", "mailUser", "dateNaissance", "password", "admin") values ($1, $2, $3, $4, $5, $6, false)';//we're escaping values to avoid sql injection
    console.log(query);
    db.query(query, [pseudo, nom, prenom, mail, date, passwordCrypt], function (err, result) {
        if (err) throw err;
        res.end("Utilisateur créé");
    });
});

function userExist(loginUser) {
  let query = 'select * from public.user where "loginUser" = $1';
  console.log(query);
  db.query(query, [loginUser], function (err, result) {
    if (err) throw err;
    return result;
  });
}

module.exports = router;
