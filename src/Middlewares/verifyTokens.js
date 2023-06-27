let jwtSecrete = process.env.JWT_SECRETE;
const jwt = require("jsonwebtoken");
//Validate whether the token is active or not
function validateToken(req, res, next) {
  //logical token method needed to be added
  if (req.headers) {
    if (req.headers.authorization) {
      try {
        // console.log('Block received');
        var token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if (token) {
          // console.log('received token');
          try{
            const verifyToken = jwt.verify(token, jwtSecrete);
          console.log(verifyToken)
          if (verifyToken) {
            // console.log('Verified')
            next();
          } else {
            res.status(401).send("UnAuthorised User");
          }
          }catch(e){
            res.status(401).send("UnAuthorised User");
          }
        } else {
          console.log("No token found at header");
          res.status(401).send("Unauthorised User!");
        }
      } catch (e) {
        return false;
      }
    } else {
      res.status(401).send("No authorisation is present in the header");
    }
  } else {
    res.status(401).send("No Header is present in the Request");
  }
}

module.exports = validateToken;
