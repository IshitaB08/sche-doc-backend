const jwtModule = require("../utils/jwtModule")
const httpStatus = require("../utils/httpStatus");

verifyToken = (req, res, next) => {
  const token = jwtModule.parseTokenFromAuthorizationHeader(req)
  if (token) {
    const verifyResult = jwtModule.verify(token)
    if (verifyResult) {
      req.decoded = verifyResult
      next();
    } else {
      return res.status(httpStatus.FORBIDDEN).send('Bearer token failed verification');
    }
  } else {
    return res.status(httpStatus.FORBIDDEN).send('Bearer token not provided as expected in authorization header');
  }
}
module.exports = verifyToken;