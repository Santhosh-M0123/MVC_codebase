const User_Auth = require("../Model/authModel");
const { Op } = require("sequelize");
const { Comparehash } = require("../Helpers/hashPassword");

//Restore all the deleted Account bacK
async function RestoreAll(req, res) {
  //Only SuperAdmin can have access to retrive all of deleted accounts
  try {
    await User_Auth.restore().then(async () => {
      await User_Auth.update(
        { User_status: 0 },
        { where: { User_status: 1 } }
      ).then(res.send("Account has been retrived successfully"));
    });
  } catch (e) {
    res.status(400).send("We are trying to fetch your account back!!");
  }
}

//restore the Data only by specific Id
async function RestoreById(req, res) {
  let { userName, password } = req.body;
  // let {restoreId} = req.body;
  try {
    let credentials = await User_Auth.findOne({ where: { User_name: userName },paranoid : false });
    if (credentials) {
      let passhash = Comparehash(password, credentials.User_password);
      if (passhash) {
        await User_Auth.restore({
          where: {
            User_id : credentials.User_id
          },
        }).then(async () => {
          await User_Auth.update(
            { User_status: 0 },
            {
              where: {
                [Op.and]: [{ User_status: 1 }, { User_id: credentials.User_id }],
              },
            }
          ).then(res.send("Restores successfully"));
        });
      } else {
        res.status(401).send("Password mismatches");
      }
    } else {
      res.status(401).send("Username mismatches");
    }
  } catch (e) {
    res.status(400).send("We are trying to fetch your data back!!");
  }
}

const RestoreData_ = {
  get: RestoreAll,
  post: RestoreById,
};

module.exports = RestoreData_;
