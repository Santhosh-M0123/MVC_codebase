const { accessToken, refreshToken } = require("../Model/Token"); //model from Model Directory
const {getToken} = require('../Auth/tokens');
// const authToken = require('../Auth/tokens');

async function LogoutUser(req, res) {
  //Get access and refresh token from user request
  let { refresh_token } = req.body;
  let access_token = getToken(req);
  // console.log(refresh_Token)
  if ((access_token != null) & (refresh_token != undefined || null)) {
    try {
      let Logout = await accessToken
        .destroy({ where: { token: access_token } })
        .then(
          await refreshToken.destroy({
            where: { refresh_Token: refresh_token },
          })
        );
        if(Logout){
          res.status(200).send("Logout Success!!");
        }else{
          res.status(400).send("Cannot logout Its seems to bad request:|");
        }
    } catch (e) {
        console.log(e);

    }
  }else{
    res.status(400).send('Required Data token is missing ;)');
  }
}

let LogoutUser_ = {
    post : LogoutUser
}

module.exports = LogoutUser_;