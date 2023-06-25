const User_Auth = require("../Model/authModel"); //model user_auth
const userRoleModel = require("../Model/userRoleModel"); //model user_role
const Auth = require("../Auth/tokens"); //Module from Auth directory
const { accessToken, refreshToken } = require("../Model/Token"); //model from Model Directory
const { Comparehash } = require("../Helpers/hashPassword"); //hashPassword from Helpers Directory
const { ConvertToLowerCase } = require("../Helpers/stringMethods");

//function handles the login logics
async function LoginUser(req, res) {
  //Get User credentials from the body
  let { userName, userPassword } = req.body;
  //Find whether the credentials found in the model user_auth
  let Logincredientials = await User_Auth.findOne({
    where: { User_name: ConvertToLowerCase(userName) },
  });
  if (Logincredientials != null) {
    try {
      let LoginResult = await Comparehash(
        userPassword,
        Logincredientials.User_password
      ); //compare hashpassword
      console.log(LoginResult);
      if (LoginResult) {
        let Token_present = await accessToken.findOne({
          where: { user_id: Logincredientials.User_id },
        });//Find whether anyother token is presen in the u_token model 
        let userRole = await userRoleModel.findOne({
          where: { u_role_id: Logincredientials.roleId },
        }); //Get UserRole of the user from role model
        if (userRole != null) {
          //data to bind with the JWT token
          let TokenData = {
            userName: Logincredientials.User_name,
            userRole: userRole,
          };
          if (TokenData != undefined) {
            let AuthToken = Auth.createAccessToken(TokenData); //Generate access token
            let RefreshToken = Auth.createRefreshToken(TokenData); //Generate refresh token
            if (Token_present != null) {
              //Update accessToken if token already found in the token model
              await accessToken
                .update(
                  { token: AuthToken },
                  { where: { user_id: Logincredientials.User_id } }
                )
                .then(console.log("updated to DB"))
                .then(
                  refreshToken.update(
                    { refresh_token: RefreshToken },
                    { where: { user_id: Logincredientials.User_id } }
                  )
                );
              res.cookie("AuthToken", AuthToken); //Add access token to response cookie
              res
                .status(200)
                .send({ accessToken: AuthToken, RefreshToken: RefreshToken });
            }else{
              //create new token if the token is not found in token model
              await accessToken
                .create({
                  user_id: Logincredientials.User_id,
                  token: AuthToken,
                })
                .then(console.log("Added to Db"))
                .then(
                  refreshToken.create({
                    user_id: Logincredientials.User_id,
                    refresh_token: RefreshToken,
                  })
                );
              res.cookie("AuthToken", AuthToken); //Add access token to response cookie
              res
                .status(200)
                .send({ accessToken: AuthToken, RefreshToken: RefreshToken });
            }
            // if (AuthToken) {
              
            // } else {
            //   console.log("Error in Authtoken");
            //   res.status(400).send("Login Verification failed");
            // }
          } else {
            console.log("TokenData in undefined");
            res.status(400).send("Login Verification failed");
          }
        } else {
          console.log("No such role id");
          res.status(400).send("Login Verification failed");
        }
      } else {
        res.status(400).send("Password mismatches!!");
      }
    } catch (e) {
      console.log(e);
      res.status(401).send("Error Ocuurs");
    }
  } else {
    res.status(400).send("UserName mismatches!!");
  }
}

//api call for this route
let LoginUser_ = {
  post: LoginUser,
};

module.exports = LoginUser_;
