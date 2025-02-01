const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1h'});
    // expiresIn: '1h' means token will expire in 1 hour
};


module.exports = generateToken;