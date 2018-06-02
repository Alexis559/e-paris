const express = require('express');
const router = express();
const auth = require('../auth/access');
const utils = require('../auth/auth');
const jwt = require('jsonwebtoken');
const db = require('../db/dbConnection');
const uuid = require('../auth/uuid');


console.log("Routeur Bet");

//Get the bets of a user
router.get('/get', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], uuid.uuid);
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query = 'SELECT g."nameGame", e."dateBet", e."scoreTeam1", e."scoreTeam2", e."pointsMise", e."win", e."points", m."dateMatch", t."nameTeam", t2."nameTeam" as "nameTeam2" FROM public.team t2, public.ebets e, public.team t, public.game g, public.match m where t."idTeam" <> t2."idTeam" and t."idTeam" = m."idTeam1" and t2."idTeam" = m."idTeam2" and e."idUser" = $1 and e."idMatch" = m."idMatch" and g."idGame" = m."idGame"';
    client.query(query, [decoded.idUser], function (err, result) {
      done();
      if (err) throw err;
      res.status(200).json({success: true, result});
    });
  });
});

//Add a bet for a user
router.post('/add', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'],  uuid.uuid);
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
                let query5 = 'SELECT  ("score") from public.user where "idUser" = $1';
                client.query(query5, [idUser], function (err, score) {
                  if (err) throw err;
                  let scorePrev = (parseInt(score.rows[0].score) - parseInt(pointsMise));
                if (scorePrev < 0) {
                  done();
                  res.status(409).json({
                    success: false,
                    message: 'Pas assez de points !',
                  });
                } else {
                  let query5 = 'UPDATE public.user set "score" = $1 where "idUser" = $2';
                  client.query(query5, [scorePrev, idUser]);
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
          }});
      }
    });
  }
});
});
});


module.exports = router;
