require("dotenv").config();
const app = require("express")();
const Manager = require("./src/Routes/apiManager");
const port = process.env.PORT || 3001;
const database = require("./src/Model/index");
const bodyparser = require("body-parser");
const cors = require("cors");
const user_role = require("./src/Model/userRoleModel");
const validateToken = require("./src/Middlewares/verifyTokens");
const AuthManager = require("./src/Routes/authManager");
const User_Auth = require("./src/Model/authModel");

app.get("/select", async (req, res) => {
  let d = await User_Auth.findAll({
    paranoid: false,
    where: { User_status: 1 },
  });
  console.log(d);
  res.send(d);
});
app.get("/post", async (req, res) => {
  let d = await user_role.create({ u_role_name: "user" });
  res.send(d);
});

app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

// Manger will maintain the routing stage for all path
app.use("/auth", AuthManager); //Handle logics of auth ---> login,register,restoreAccount etc...
app.use("/api/*", validateToken); //Validation of token goes here
app.use("/api/", Manager); //Handle logics of api route

app.get("/up", (req, res) => {
  res.render("uploadFile");
});

//sync database with the server
database.sync({ force: false }).then((res) => {
  app.listen(port, () => console.log(`Happy hacking @ ${port}`));
});
