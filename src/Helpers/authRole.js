const parseToken = require('../Auth/tokens');//module from auth folder

//function used to parse the user role from the token
async function AuthRole(req,role){
    let userData = parseToken.parseToken(req);//return a userRole
    let userRole = userData.userRole.toLowerCase();//convert to userRole to lowercase 
    //role parameter describes the permitted user for the route
    if(role.includes(userRole)){
        return true
    }else{
        return false
    }
}

module.exports = AuthRole;