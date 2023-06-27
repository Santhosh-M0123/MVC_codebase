const User_Auth = require('../Model/authModel');
const {Deletedaccount} = require('../Helpers/mailer');
const generateDate = require('../Helpers/generateDate');
const {parseToken} = require('../Auth/tokens');
async function DeleteProfile(req,res){
    //Getting User Credentials
    let userCredentials = parseToken(req);
    // const {userId} = req.body;
    try{
        let credentials = await User_Auth.findOne({where : {User_name : userCredentials.userName}})
        if(credentials){
            await User_Auth.update({User_status : 1} , {where : {User_name : userCredentials.userName}}).then(async () => {
                await User_Auth.destroy({where : {User_name : userCredentials.userName}}).then(async () => {
                    await Deletedaccount(credentials.User_email , {name : credentials.User_name,company : "Uxon",deletionDate : generateDate()});
                    res.send("Deleted Successfully")
                })
            })
            .catch(e => {
                console.log(e)
            })
        }else{
            res.status(400).send("No such user present in Database!!")
        }
    }catch(e){
        console.log(e);
        res.status(400).send("Cannot delete acount error occurs:|");
    }
}

const DeleteProfile_ = {
    post : DeleteProfile
}

module.exports = DeleteProfile_;