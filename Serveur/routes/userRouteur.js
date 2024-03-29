const express = require('express');
const router = express();
const db = require('../db/dbConnection');
const utils = require('../auth/auth');
const auth = require('../auth/access');
const jwt = require('jsonwebtoken');
const uuid = require('../auth/uuid');


console.log("Routeur User");

//get user
router.post('/login', function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
  db.db.connect(function (err, client, done) {
      if (err) {
        done();
        throw err;
      }
      let query = 'SELECT * from public.user where "loginUser" = $1';//we're escaping values to avoid sql injection
      client.query(query, [login], function (err, result) {
        done();
        if (err) throw err;
        if (result.rows[0] !== undefined) {
          if (utils().compareSync(password, result.rows[0].password)) {
            const payload = {
              admin: result.rows[0].admin,
              login: result.rows[0].loginUser,
              idUser: result.rows[0].idUser,
            };
            var token = utils().createToken(payload);
            // return the information including token as JSON
            res.status(200).json({
              success: true,
              message: 'Utilisateur connecté !',
              token: token,
              admin: result.rows[0].admin,
            });
          } else {
            res.status(401).json({
              success: false,
              message: 'Utilisateur inconnu !',
              token: null
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: 'Utilisateur inconnu !',
            token: null
          });
        }
      })
    });
});

//get the profil of the user connected
router.get('/profil', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'],uuid.uuid);
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query = 'SELECT "loginUser", "nomUser", "prenomUser", "mailUser", "dateCreation", "score", "admin" from public.user where "loginUser" = $1 and "idUser" = $2';
    client.query(query, [decoded.login, decoded.idUser], function (err, result) {
      done();
      if (err) throw err;
      if (result.rows[0] !== undefined) {
        res.status(200).json({success: true, result});
      } else {
        res.status(401).json({
          success: false,
          message: 'Utilisateur inconnu !'
        })
        ;
      }
    })
  });
});

//add user
router.post('/add', function (req, res) {
    let pseudo = req.body.pseudo;
    let password = req.body.password;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let date = req.body.date;
    let mail = req.body.mail;
    let passwordCrypt = utils().cryptPassword(password);
    db.db.connect(function (err, client, done) {
      if (err) {
        done();
        throw err;
      }
      let query1 = 'select count(*) from public.user where "loginUser" = $1';
      client.query(query1, [pseudo], function (err, result) {
        if (result.rows[0].count === '1') {
          done();
          res.status(409).json({
            success: false,
            message: 'Ce login est déjà utilisé !',
          });
        } else {
          let query = 'INSERT INTO public.user ("loginUser", "nomUser", "password", "prenomUser", "mailUser", "dateNaissance", "admin") values ($1, $2, $3, $4, $5, $6, false)';//we're escaping values to avoid sql injection
          client.query(query, [pseudo, nom, passwordCrypt, prenom, mail, date], function (err, result) {
            done();
            if (err) throw err;
            res.status(201).json({
              success: true,
              message: 'Utilisateur créé !',
            });
          });
        }
      })
    });
});

//update a user
router.put('/update', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'], uuid.uuid);
  let pseudo = req.body.pseudo;
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let mail = req.body.mail;
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query1 = 'select count(*) from public.user where "loginUser" = $1';
    client.query(query1, [pseudo], function (err, result) {
      //if the login already exists we return an error
      if (decoded.login !== pseudo && result.rows[0].count === '1') {
        done();
        res.status(409).json({
          success: false,
          message: 'Ce login est déjà utilisé !',
        });
      } else {
        let query = 'UPDATE public.user set "loginUser" = $1, "nomUser" = $2, "prenomUser" = $3, "mailUser" = $4 where "loginUser" = $5 and "idUser" = $6';//we're escaping values to avoid sql injection
        client.query(query, [pseudo, nom, prenom, mail, decoded.login, decoded.idUser], function (err, result) {
          if (err) throw err;
          done();
          const payload = {
            admin: decoded.admin,
            idUser: decoded.idUser,
            login: pseudo
          };
          var token = utils().createToken(payload);
          // return the information including the new token as JSON
          res.status(201).json({
            success: true,
            message: 'Utilisateur modifié !',
            token: token,
          });
        });
      }
    })
  });
});

//delete a user
router.delete('/delete', auth, function (req, res) {
  const decoded = jwt.verify(req.headers['x-access-token'],uuid.uuid);
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query1 = 'select count(*) from public.user where "loginUser" = $1 and "idUser" = $2 ';
    client.query(query1, [decoded.login, decoded.idUser], function (err, result) {
      if (result.rows[0].count === '0') {
        done();
        res.status(409).json({
          success: false,
          message: 'Utilisateur inconnu !',
        });
      } else {
        let query = 'delete from public.user where "loginUser" = $1 and "idUser" = $2';//we're escaping values to avoid sql injection
        client.query(query, [decoded.login, decoded.idUser], function (err, result) {
          done();
          if (err) throw err;
          res.status(201).json({
            success: true,
            message: 'Utilisateur supprimé !',
          });
        });
      }
    })
  });
});

//get the ranking
router.get('/classement', function (req, res) {
  db.db.connect(function (err, client, done) {
    if (err) {
      done();
      throw err;
    }
    let query = 'SELECT "loginUser", "score" from public.user order by "score" desc limit 100';
    client.query(query, function (err, result) {
      done();
      if (err) throw err;
      res.status(200).json({success: true, result});
    })
  });
});

module.exports = router;
