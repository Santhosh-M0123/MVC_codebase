const routes = require("../Controller/index");

module.exports = [
{
    path : "/upload/single",
    controller : routes.singleFileUpload_
},
{
    path : '/upload/multiple',
    controller : routes.multipleFileUpload_
}
,{
    path : '/logout',
    controller : routes.LogoutUser_
},
{
    path : '/changepassword',
    controller : routes.ChangePassword_
},{
    path : '/deleteaccount',
    controller : routes.DeleteProfile_
},
{
    path : '/getdata',
    controller : routes.GetData
}]