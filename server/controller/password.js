const bcrypt = require('bcrypt');
const saltRounds = 10;

generatePassword = (password, callback) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            callback('error');
        } else {
            callback(hash);
        }
    });
};
comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, res) => {
        callback(res);
    });
}

module.exports = {
    comparePassword: comparePassword,
    generatePassword: generatePassword
}

