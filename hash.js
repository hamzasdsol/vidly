const passwordHash = require('password-hash');

function generateHash(password) {
    return passwordHash.generate(password);
}

function validatePasswordHash(password){
    let hashedPassword = passwordHash.generate(password);
    return passwordHash.verify(password,hashedPassword);
}
module.exports.generateHash = generateHash;
module.exports.validatePasswordHash = validatePasswordHash;