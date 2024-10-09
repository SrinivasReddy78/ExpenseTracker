const jwt = require('jsonwebtoken');

const verifyToken = (token) =>{
    try {
        return  jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        throw error;
    }
}

module.exports.verifyToken = verifyToken;