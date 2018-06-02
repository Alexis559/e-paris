
module.exports = function(){
    const uuid = require('./uuid');
    const bcrypt = require('bcrypt-nodejs');
    const jwt = require('jsonwebtoken');

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
        return jwt.sign(payload, uuid.uuid);
    };

    module.getUserLogin = function(req) {
      if(req !== undefined){
        let decoded = jwt.verify(req.headers['x-access-token'], uuid.uuid);
        return decoded;
      }else{
        return 'pas de chance';
      }
    };

    return module;
};
