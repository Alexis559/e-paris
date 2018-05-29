const express = require('express');
const router = express();

userRoute = require('../routes/userRouteur');
gameRoute = require('../routes/gameRouteur');
matchRoute = require('../routes/matchRouteur');
teamRoute = require('../routes/teamRouteur');

console.log("Routeur");

router.use('/user', userRoute);
router.use('/game', gameRoute);
router.use('/match', matchRoute);
router.use('/team', teamRoute);

module.exports = router;
