const jwt = require("jsonwebtoken");
// get your JWT secret from environment variable
const secretOrKey = process.env.JWT_SECRETORKEY;

module.exports = {
  sign: (payload, options) => {
    const signingOptions = {
      expiresIn: process.env.JWT_EXPIRES,
      issuer: process.env.JWT_ISSUER,
      subject: options.subject
    };
    return jwt.sign(payload, secretOrKey, signingOptions);
  },
  parseTokenFromAuthorizationHeader: (req) => {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader || !authorizationHeader.includes('Bearer ')) {
      return null
    }
    return req.headers['authorization'].split(' ')[1]
  },
  verify: (token) => {
    const verifyOptions = {
      expiresIn: process.env.JWT_EXPIRES,
      issuer: process.env.JWT_ISSUER
    };
    try {
      return jwt.verify(token, secretOrKey, verifyOptions);
    } catch (err) {
      return null;
    }
  },
  decode: (token) => {
    return jwt.decode(token, { complete: true });
  }
}