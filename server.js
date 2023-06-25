require("dotenv").config();
const app = require("express")();
const Manager = require("./src/Routes/apiManager");
const port = process.env.PORT || 3001;
const database = require("./src/Model/index");
const bodyparser = require("body-parser");
const cors = require("cors");
const user_role = require("./src/Model/userRoleModel");
const {validateToken} = require('./src/Auth/tokens');
const Dategenerate = require('./src/Helpers/generateDate');
const {Op} = require("sequelize");
// const {OTPMail} = require('./src/Helpers/mailer');
// OTPMail('santhoshmsanthosh.1916@gmail.com')
// const {ConvertToLowerCase} = require('./src/Helpers/stringMethods');
const User_Auth = require('./src/Model/authModel');

// User_Auth.restore();

app.get('/select' , async (req,res) => {
  // let d = await User_Auth.findAll({where : {deletedData : {[Op.ne] : null}}});
  let d = await User_Auth.findAll({paranoid: false,where : {User_status : 1}});
  console.log(d)
  res.send(d)
})
app.get("/post", async (req, res) => {
  let d = await user_role.create({ u_role_name: "user" });
  res.send(d);
});
app.set('view engine','ejs');
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
// Manger will maintain the routing stage for all path
// app.use('/user/*', validateToken);
app.use("/", Manager);

//sync database with the server
database.sync({ force: false }).then((res) => {
  app.listen(port, () => console.log(`Happy hacking @ ${port}`));
});
