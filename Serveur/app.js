var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');

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

app.use(express.static(path.join(__dirname,'../dist')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname,'../dist/index.html'));
});

app.listen(port);

module.exports = app;
