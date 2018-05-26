var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
app.disable('x-powered-by');//secutity
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3333;

// router
var api = require('./routes/routeur');

// routes
app.use('/api',api);


//On indique ou se trouvent les fichiers
app.use(express.static(path.join(__dirname,'../dist')));
//Requete de base qui envoi vers index.html
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname,'../dist/index.html'));
});


app.listen(port);

module.exports = app;