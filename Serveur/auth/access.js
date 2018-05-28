const jwt = require('jsonwebtoken');

module.exports = function (req, res, callback) {
    try {
        const decoded = jwt.verify(req.headers['x-access-token'], "9d5553af-a457-4a19-9c2c-09f950912397");
        req.userData = decoded;
        callback();
    }catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Vous devez être connecté !'
        });
    }
};
