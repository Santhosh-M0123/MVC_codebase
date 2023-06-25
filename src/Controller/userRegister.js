const shortId = require("../Helpers/shortId");
const User_Auth = require("../Model/authModel");
const { WelcomeUser } = require("../Helpers/mailer");
const {Op} = require("sequelize");

async function RegisterUser(req, res) {
  //Get User credentials
  let { userName, userPassword, userEmail } = req.body;
  //Validate whether the user credentials present in database
  let ValidateUser = await User_Auth.findOne({
    where: {[Op.or] : [
      {User_name: userName},
      {User_email : userEmail}
    ]},
  });
  if (ValidateUser != null) {
    res.status(400).send("UserName or Email already exists!!");
  } else {
    try {
      await User_Auth.create({
        User_id: shortId,
        User_name: userName,
        User_password: userPassword,
        User_email: userEmail,
        // roleId : 2
      }).then(() => {
        WelcomeUser(userEmail, userName);
        res.status(200).send("registerd Successfully");
      });
    } catch (error) {
      console.log(error);
      res.status(401).send("Error Occurs");
    }
  }
}

let RegisterUser_ = {
  post: RegisterUser,
};
module.exports = RegisterUser_;
