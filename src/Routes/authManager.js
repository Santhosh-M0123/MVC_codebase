const authFilter = require("../Helpers/authFilter");

//Manager manages all the route and map for the specific controller
let AuthManager = (req,res) => {
    let handler = authFilter(req.url , req.method); //apifilter filters the path and return controller 
     if(handler != null){
      handler(req,res);
     }else{
        res.status(404).send("page not found");
     }
}

module.exports = AuthManager;