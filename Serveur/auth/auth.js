module.exports = function(){
    const bcrypt = require('bcrypt-nodejs');
    const jwt = require('jsonwebtoken');
    const randomSecretKey = "9d5553af-a457-4a19-9c2c-09f950912397";

    const module = {};

    //return the hashed version of the password
    module.cryptPassword = function (plainPassword) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainPassword, salt);
    };

    //return true if hash(plainPassword) == password
    module.compareSync = function (password, plainPassword) {
        return bcrypt.compareSync(password, plainPassword)
    };

    // return the jsonWebToken as string
    module.createToken = function (payload) {
        return jwt.sign(payload, randomSecretKey);
    };

    return module;
};
