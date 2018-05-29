const express = require('express');
const router = express();
const db = require('../db/dbConnection');
const utils = require('../auth/auth');
const auth = require('../auth/access');
const jwt = require('jsonwebtoken');

console.log("Routeur Team");

//add game
router.post('/add', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], "9d5553af-a457-4a19-9c2c-09f950912397");
  let nameTeam = req.body.nameTeam;
  let dateCreation = req.body.dateCreation;
  let imgUrl = req.body.imgUrl;
  let idGame = req.body.idGame;
  let query2 = 'select count(*) from public.team where "nameTeam" = $1';
  //we verify if the does not already exists
  db.query(query2, [nameTeam], function (err, result) {
    //if the pseudo already exists we return an error
    if (result.rows[0].count === '1') {
      res.status(409).json({
        success: 'false',
        message: 'Cette team existe déjà !',
      });
    } else {
      //we verify if the person has the right to do the action
      let query1 = 'select * from public.user where "loginUser" = $1 and "idUser" = $2';
      db.query(query1, [decoded.login, decoded.idUser], function (err, result) {
        console.log(result);
        if (result.rows[0].admin === false) {
          res.status(403).json({
            success: 'false',
            message: 'Vous n\'avez pas les droits !',
          });
        } else {
          //we had the team in the bdd
          let query = 'INSERT INTO public.team ("nameTeam", "logoTeam", "dateCreation") values ($1, $2, $3) RETURNING "idTeam"';//we're escaping values to avoid sql injection
          db.query(query, [nameTeam, imgUrl, dateCreation], function (err, result) {
            if (err) throw err;
            //we had the team that we created to the game
            let query2 = 'INSERT INTO public.playsin ("idGame", "idTeam") values ($1, $2)';//we're escaping values to avoid sql injection
            db.query(query2, [idGame, result.rows[0].idTeam], function (err) {
              if (err) throw err;
              res.status(201).json({
                success: 'true',
                message: 'Team créée et ajoutée au jeu !',
              });
            });
          });
        }
      });
    }
  })
});


module.exports = router;
