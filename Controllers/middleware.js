require('dotenv').config()
const jwt = require('jsonwebtoken');

const {TOKEN_KEY} = process.env
//decoding of jwt
const verifyJWT = (req,res, next)=>{
    const token = req.headers["x-access-token"];
    console.log(token)
    // req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).json({code:"Invalid Token"});
      }
      return next();
}
module.exports = verifyJWT