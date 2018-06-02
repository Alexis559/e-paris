const express = require('express');
const router = express();
const auth = require('../auth/access');
const utils = require('../auth/auth');
const jwt = require('jsonwebtoken');
const db = require('../db/dbConnection');
const uuid = require('../auth/uuid');


console.log("Routeur Team");

//Get a team by his id
router.get('/get/:idgame', function (req, res) {
  var idgame = req.params.idgame;
  var idGame = parseInt(req.params.idgame);
  db.db.connect(function (err, client, done) {
      if (err) {
        done();
        throw err;
      }
    if(isNaN(idGame)) {
        done();
      res.status(404).json({success: false, message: 'Jeu inconnu !'});
    }else {
      let query = 'SELECT * FROM public.team where "idTeam" in (SELECT "idTeam" from public.playsin where "idGame" = $1)';
      client.query(query, [idgame], function (err, result) {
        done();
        if (err) throw err;
        res.status(200).json(result);
      });
    }
  })
});

//Get the teams that are a least affected to a game
router.get('/teamplays', function (req, res) {
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query = 'SELECT * FROM public.playsin group by "idGame", "idTeam" order by "idGame" asc';
    client.query(query, function (err, result) {
      done();
      if (err) throw err;
      res.status(200).json(result);
    });
  })
});

//Get the teams
router.get('/get', function (req, res) {
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query = 'SELECT * FROM public.team  ';
    client.query(query, function (err, result) {
      done();
      if (err) throw err;
      res.status(200).json(result);
    });
  })
});

//Add a team
router.post('/add', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], uuid.uuid);
  let nameTeam = req.body.nameTeam;
  let dateCreation = req.body.dateCreation;
  let imgUrl = req.body.imgUrl;
  let idGame = req.body.idGame;

  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query2 = 'select count(*) from public.team where "nameTeam" = $1';
    //we verify if the does not already exists
    client.query(query2, [nameTeam], function (err, result) {
      //if the pseudo already exists we return an error
      if (result.rows[0].count === '1') {
        done();
        res.status(409).json({
          success: false,
          message: 'Cette team existe déjà !',
        });
      } else {
        //we verify if the person has the right to do the action
        let query1 = 'select * from public.user where "loginUser" = $1 and "idUser" = $2';
        client.query(query1, [decoded.login, decoded.idUser], function (err, result) {
          if (result.rows[0].admin === false) {
            done();
            res.status(403).json({
              success: false,
              message: 'Vous n\'avez pas les droits !',
            });
          } else {
            //we had the team in the bdd
            let query = 'INSERT INTO public.team ("nameTeam", "logoTeam", "dateCreation") values ($1, $2, $3) RETURNING "idTeam"';//we're escaping values to avoid sql injection
            client.query(query, [nameTeam, imgUrl, dateCreation], function (err, result) {
              if (err) throw err;
              //we had the team that we created to the game
              let query2 = 'INSERT INTO public.playsin ("idGame", "idTeam") values ($1, $2)';//we're escaping values to avoid sql injection
              client.query(query2, [idGame, result.rows[0].idTeam], function (err) {
                done();
                if (err) throw err;
                res.status(201).json({
                  success: true,
                  message: 'Team créée et ajoutée au jeu !',
                });
              });
            });
          }
        });
      }
    })
  })
});


module.exports = router;
