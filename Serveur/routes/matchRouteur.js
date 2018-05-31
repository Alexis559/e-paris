const express = require('express');
const router = express();
const auth = require('../auth/access');
const jwt = require('jsonwebtoken');
var db = require('../db/dbConnection');


console.log("Routeur Match");

//add game
router.post('/add', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], "9d5553af-a457-4a19-9c2c-09f950912397");
  let idTeam1 = req.body.idTeam1;
  let idTeam2 = req.body.idTeam2;
  let dateMatch = req.body.dateMatch;
  let idGame = req.body.idGame;
  let description = req.body.description;
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query2 = 'select count(*) from public.match where "idTeam1" = $1 and "idTeam2" = $2 and "idGame" = $3 and "dateMatch" = $4';
    client.query(query2, [idTeam1, idTeam2, idGame, dateMatch], function (err, result) {
      //if the pseudo already exists we return an error
      if (result.rows[0].count === '1'  ) {
        done();
        res.status(409).json({
          success: false,
          message: 'Ce match existe déjà !',
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
            let query = 'INSERT INTO public.match ("idTeam1", "idTeam2", "dateMatch", "scoreTeam1", "scoreTeam2", "idGame", "description") values ($1, $2, $3, $4, $5, $6, $7)';//we're escaping values to avoid sql injection
            client.query(query, [idTeam1, idTeam2, dateMatch, -1, -1, idGame, description], function (err) {
              if (err) throw err;
              done();
              // return the information including the new token as JSON
              res.status(201).json({
                success: true,
                message: 'Match ajouté !',
              });
            });
          }
        });
      }
  });
  })
});

router.get('/get', auth, function (req, res) {
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    client.query("SELECT * from public.match;", (err, result) => {
      done();
      if (err) throw err;
      res.status(200).json(result.rows);
    })
  });
});

router.get('/get/:idmatch', auth, function (req, res) {
  var idMatch = parseInt(req.params.idmatch);
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    if(isNaN(idMatch)) {
      done();
      res.status(404).json({success: false, message: 'Match inconnu !'});
    }else{
      let query = 'SELECT * FROM public.team t, public.game g, public.match m where (t."idTeam" = m."idTeam1" or t."idTeam" = m."idTeam2") and g."idGame" = m."idGame" and m."idMatch" = $1';
      client.query(query, [idMatch], function (err, result) {
        done();
        if (err) throw err;
        res.status(200).json(result);
      });
    }
  });
});

//add game
router.post('/result/:idmatch', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], "9d5553af-a457-4a19-9c2c-09f950912397");
  var idMatch = parseInt(req.params.idmatch);
  let scoreTeam1 = req.body.scoreTeam1;
  let scoreTeam2 = req.body.scoreTeam2;
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    if(isNaN(idMatch)) {
      done();
      res.status(404).json({success: false, message: 'Match inconnu !'});
    }
    let query2 = 'select count(*) from public.match where "idMatch" = $1';
    client.query(query2, [idMatch], function (err, result) {
      if (result.rows[0].count === '0'  ) {
        done();
        res.status(409).json({
          success: false,
          message: 'Ce match n\'existe pas !',
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
            let query = 'UPDATE public.match set "scoreTeam1" = $1, "scoreTeam2" = $2 where "idMatch" = $3';//we're escaping values to avoid sql injection
            client.query(query, [scoreTeam1, scoreTeam2, idMatch], function (err) {
              if (err) throw err;
              done();
              // return the information including the new token as JSON
              res.status(201).json({
                success: true,
                message: 'Résultat ajouté !',
              });
            });
          }
        });
      }
    });
  })
});

module.exports = router;
