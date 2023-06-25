const User_Auth = require("../Model/authModel");
const token = require("../Auth/tokens");
const { Comparehash } = require("../Helpers/hashPassword"); //hashPassword from Helpers Directory

async function ChangePassword(req, res) {
  let { oldPassword,newPassword } = req.body;
  try {
    let tokenPayload = token.parseToken(req);
    if (tokenPayload) {
      let userPassword = await User_Auth.findOne({
        where: { User_name: tokenPayload.userName },
      });
      console.log(userPassword);
      let passwordCheck = await Comparehash(oldPassword, userPassword.User_password);
      console.log(passwordCheck);
      if (passwordCheck) {
        await User_Auth.update(
          { User_password: newPassword },
          { where: { User_name: tokenPayload.userName } }
        )
          .then(() => {
            res.status(200).send("password updated successfully!!");
          })
          .catch((e) => {
            console.log(e);
            res.status(400).send("error");
          });
      } else {
        res.status(400).send("Password mismatches!!");
      }
    } else {
      res.status(401).send("Unauthorised header!!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
}

const ChangePassword_ = {
  post: ChangePassword,
};

module.exports = ChangePassword_;
