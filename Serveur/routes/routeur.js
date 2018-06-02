const express = require('express');
const router = express();

userRoute = require('../routes/userRouteur');
gameRoute = require('../routes/gameRouteur');
matchRoute = require('../routes/matchRouteur');
teamRoute = require('../routes/teamRouteur');
betRoute = require('../routes/betRouteur');

console.log("Routeur");

router.use('/user', userRoute);
router.use('/game', gameRoute);
router.use('/match', matchRoute);
router.use('/team', teamRoute);
router.use('/bet', betRoute);

module.exports = router;
