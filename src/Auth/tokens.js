const jwt = require("jsonwebtoken");
let jwtSecrete = process.env.JWT_SECRETE;

/*
Token are created,decoded,authorised
*/

//CreateToken used to create a new access token for new user login
function createAccessToken(data) {
  let token = jwt.sign(data, jwtSecrete, {
    expiresIn: "3d",
  });
  return token;
}

//CreateToken used to create a new refresh token for new user login
function createRefreshToken(data) {
  let token = jwt.sign(data, jwtSecrete, {
    expiresIn: "7d",
  });
  return token;
}
//Validate whether the token is active or not
function validateToken(req, res, next) {
  //logical token method needed to be added
  if(req.headers){
    if (req.headers.authorization) {
      try {
        var token = req.headers.authorization.split(" ")[1];
        if (token) {
          const verifyToken = jwt.verify(token, jwtSecrete);
          if (verifyToken) {
            next();
          } else {
            res.status(401).send("UnAuthorised User");
          }
        } else {
          console.log("No token found at header");
          res.status(401).send("Unauthorised User!");
        }
      } catch (e) {
        return false
      }
    }else{
      res.status(401).send('No authorisation is present in the header');
    }
  }else{
    res.status(401).send('No Header is present in the Request');
  }
}

//Parse dataPayload from the token
function parseToken(req) {
  if(req.headers){
    try {
      if(req.headers.authorization){
        var token = req.headers.authorization.split(" ")[1];
      if (token) {
        var payload = jwt.decode(token, jwtSecrete);
        return payload;
      } else {
        console.log("No token found at header");
        res.status(401).send("Unauthorised User!");
      }
      }else{
        res.status(400).send('No Authorisation is present in the Request header');
      }
    } catch (e) {
      return false
    }
  }else{
    res.status(400).send('No Header is present in the Request');
  }
}

//function to get token from the header
function getToken(req){
  if(req){
    if(req.headers){
      if(req.headers.authorization){
        var token = req.headers.authorization.split(" ")[1];
        if(token){
          return token;
        }else{
          return null;
        }
      }else{
        res.status(400).send('No authorization is found in the header');
      }
    }else{
      res.status(400).send('No header found in the request');
    }
  }
}

//Check Token is expired or not
function isTokenExpired(token) {
  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const currentTimestamp = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    // Token verification failed or token is malformed
    return true;
  }
}

const AuthTokens = {
  createAccessToken,
  parseToken,
  validateToken,
  createRefreshToken,
  isTokenExpired,
  getToken
};

module.exports = AuthTokens;
