const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: "backend/config/config.env"});

const JWT_SECRET = process.env.JWTSECRET;

const generateToken = (userId) => {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: '24h'});
}

module.exports = { generateToken }