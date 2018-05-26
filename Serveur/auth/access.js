const jwt = require('jsonwebtoken');

module.exports = function (req, res, callback) {
    try {
        const decoded = jwt.verify(req.headers['x-access-token'], "test");
        req.userData = decoded;
        callback();
    }catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};