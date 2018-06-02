const express = require('express');
const router = express();
const auth = require('../auth/access');
const utils = require('../auth/auth');
const jwt = require('jsonwebtoken');
const db = require('../db/dbConnection');
const uuid = require('../auth/uuid');

console.log("Routeur Game");

//Get the games
router.get('/get', function (req, res) {
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    client.query("SELECT * from public.game;", (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows);
      done();
    })
  });
});

//Get a game by his id
router.get('/get/:idGame', function (req, res) {
  var idGame = parseInt(req.params.idGame);
  if(isNaN(idGame)) {
    res.status(404).json({success: false, message: 'Jeu inconnu !'});
  }else{
    db.db.connect(function (err, client, done) {
      if (err) {
        done();
        throw err;
      }
      let query = 'SELECT * from public.game where "idGame" = $1';
      client.query(query, [idGame], function (err, result) {
        done();
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
  }
});

//Add a game
router.post('/add', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], uuid.uuid);
  let nameGame = req.body.nameGame;
  let dateCreation = req.body.dateCreation;
  let imgGame = req.body.imgGame;
  let descrGame = req.body.descrGame;
  let query2 = 'select count(*) from public.game where "nameGame" = $1';
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    client.query(query2, [nameGame], function (err, result) {
      //if the pseudo already exists we return an error
      if (result.rows[0].count === '1'  ) {
        done();
        res.status(409).json({
          success: false,
          message: 'Ce jeu existe déjà !',
        });
      } else {
        let query1 = 'select * from public.user where "loginUser" = $1 and "idUser" = $2';
        client.query(query1, [decoded.login, decoded.idUser], function (err, result) {
          //if the pseudo already exists we return an error
          if (result.rows[0].admin === false) {
            done();
            res.status(403).json({
              success: false,
              message: 'Vous n\'avez pas les droits !',
            });
          } else {
            let query = 'INSERT INTO public.game ("nameGame", "description", "dateCreation", "imgGame") values ($1, $2, $3, $4)';//we're escaping values to avoid sql injection
            client.query(query, [nameGame, descrGame, dateCreation, imgGame], function (err) {
              if (err) throw err;
              done();
              // return the information including the new token as JSON
              res.status(201).json({
                success: true,
                message: 'Jeu ajouté !',
              });
            });
          }
        });
      }
    });
  });
});


module.exports = router;
