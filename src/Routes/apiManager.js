const apiFilter = require("../Helpers/apiFilter");
const upload = require("../Helpers/fileHandler");

//Manager manages all the route and map for the specific controller
let Manager = (req,res) => {
    let handler = apiFilter(req.url , req.method); //apifilter filters the path and return controller 
     if(handler != null){
      handler(req,res);
     }else{
        res.status(404).send("page not found");
     }
}

module.exports = Manager;