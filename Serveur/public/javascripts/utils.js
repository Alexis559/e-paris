var bcrypt = require('bcrypt-nodejs');
const seed = 'YPYRYWBVENVLCWPBJHTGOPXVF';

function cryptPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password+seed, salt);
}