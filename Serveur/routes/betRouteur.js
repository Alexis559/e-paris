const express = require('express');
const router = express();
const auth = require('../auth/access');
const jwt = require('jsonwebtoken');
var db = require('../db/dbConnection');

console.log("Routeur Bet");

router.get('/get', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], "9d5553af-a457-4a19-9c2c-09f950912397");
    db.db.connect(function (err, client, done) {
      if (err) {
        done();
        throw err;
      }
      let query = 'SELECT * from public.ebets where "iduser" = $1';
      client.query(query, [decoded.idUser], function (err, result) {
        done();
        if (err) throw err;
        res.status(200).json({success: true, result});
      });
    });
});

router.get('/test', function (req, res) {
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query = 'SELECT  ("score") from public.user where "idUser" = $1';
    client.query(query, [1], function (err, result) {
      done();
      if (err) throw err;
      res.status(200).json({result});
    });
  });
});

/*
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
});*/

//add bet
router.post('/add', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], "9d5553af-a457-4a19-9c2c-09f950912397");
  let idUser = decoded.idUser;
  let idMatch = req.body.idMatch;
  let scoreTeam1 = req.body.scoreTeam1;
  let scoreTeam2 = req.body.scoreTeam2;
  let pointsMise = req.body.pointsMise;

  let query3 = 'select count(*) from public.match where "idMatch" = $1';
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    client.query(query3, [idMatch], function (err, result) {
      if (err) {
        done();
        throw err;
      }
      if (result.rows[0].count === '0'  ) {
        done();
        res.status(409).json({
          success: false,
          message: 'Ce match n\'existe pas !',
        });
      }
      else {
        let query2 = 'select count(*) from public.ebets where "idMatch" = $1 and "idUser" = $2';
        client.query(query2, [idMatch, idUser], function (err, result) {
          if (err) {
            done();
            throw err;
          }
          if (result.rows[0].count === '1') {
            done();
            res.status(409).json({
              success: false,
              message: 'Vous avez déjà parié sur ce match !',
            });
          } else {
            let query1 = 'select * from public.match where "idMatch" = $1';
            client.query(query1, [idMatch], function (err, result) {
              if (new Date(result.rows[0].dateMatch) < new Date()) {
                done();
                res.status(409).json({
                  success: false,
                  message: 'Le match est passé !',
                });
              }
              else {
                let query4 = 'SELECT count("pointsMise") from public.ebets where "idUser" = $1 and "idMatch" in (SELECT "idMatch" from public.match where "dateMatch" > $2)';
                client.query(query4, [idUser, new Date()], function (err, points) {
                  if (err) throw err;
                  let query5 = 'SELECT  ("score") from public.user where "idUser" = $1';
                  client.query(query5, [idUser], function (err, score) {
                    if (err) throw err;
                    let scorePrev = parseInt(score.rows[0].score) - parseInt(points.rows[0].count);
                    if (scorePrev < pointsMise) {
                      done();
                      res.status(409).json({
                        success: false,
                        message: 'Pas assez de points !',
                      });
                    } else {
                      let query = 'INSERT INTO public.ebets ("idMatch", "idUser", "scoreTeam1", "scoreTeam2", "pointsMise") values ($1, $2, $3, $4, $5)';//we're escaping values to avoid sql injection
                      client.query(query, [idMatch, idUser, scoreTeam1, scoreTeam2, pointsMise], function (err) {
                        if (err) throw err;
                        done();
                        res.status(201).json({
                          success: true,
                          message: 'Parie fait !',
                        });
                      });
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  });
});


module.exports = router;
