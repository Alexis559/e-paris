const express = require('express');
const router = express();
const db = require('../db/dbConnection');
const utils = require('../auth/auth');
const auth = require('../auth/access');
const jwt = require('jsonwebtoken');

console.log("Routeur Game");

router.get('/get', function (req, res) {
    db.query("SELECT * from public.game;", function (err, result) {
        if (err) throw err;
        res.status(200).json(result.rows);
    });
});

router.get('/get/:nameGame', function (req, res) {
  var namegame = req.params.nameGame;
  let query = 'SELECT * from public.game where "nameGame" = $1';
  db.query(query, [namegame], function (err, result) {
    if (err) throw err;
    if (result.rows[0] !== undefined) {
      res.status(200).json({success: true, result});
    } else {
      res.status(401).json({
        success: false,
        message: 'Jeu inconnu !'
      });
    }
  });
});

//add game
router.post('/add', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], "9d5553af-a457-4a19-9c2c-09f950912397");
  let nameGame = req.body.nameGame;
  let dateCreation = req.body.dateCreation;
  let imgGame = req.body.imgGame;
  let descrGame = req.body.descrGame;
  let query2 = 'select count(*) from public.game where "nameGame" = $1';
  db.query(query2, [nameGame], function (err, result) {
    //if the pseudo already exists we return an error
    if (result.rows[0].count === 1) {
      res.status(409).json({
        success: 'false',
        message: 'Ce jeu existe déjà !',
      });
    } else {
      let query1 = 'select * from public.user where "loginUser" = $1 and "idUser" = $2';
      db.query(query1, [decoded.login, decoded.idUser], function (err, result) {
        //if the pseudo already exists we return an error
        if (result.rows[0].admin === false) {
          res.status(403).json({
            success: 'false',
            message: 'Vous n\'avez pas les droits !',
          });
        } else {
          let query = 'INSERT INTO public.game ("nameGame", "description", "dateCreation", "imgGame") values ($1, $2, $3, $4)';//we're escaping values to avoid sql injection
          db.query(query, [nameGame, descrGame, dateCreation, imgGame], function (err) {
            if (err) throw err;
            // return the information including the new token as JSON
            res.status(201).json({
              success: true,
              message: 'Jeu ajouté !',
            });
          });
        }
      });
    }
  })
});


module.exports = router;
