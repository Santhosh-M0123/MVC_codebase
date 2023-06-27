const routes = require("../Routes/auth");//module imports from controllerer directory index.js


//filter logic goes for auth purpose
function authFilter(url, method) {
  // let meth = toLowerCase(method)
  let reqMethod = method.toLowerCase();
//   console.log(reqMethod)

  //Handle get request for matching route
  if (reqMethod == "get") {
    let routeController = routes.find((r) => r.path == url);
    if (routeController) {
      //return a function controller
      return routeController.controller.get;
    } else {
      return null;
    }
  }
  //handle post request for matching route
  else if (reqMethod == "post") {
    // console.log('received')
    let routeController = routes.find((r) => r.path == url);
    if (routeController) {
      //return a function controller
      return routeController.controller.post;
    } else {
      return null;
    }
  }
  //handle invalid method type
  else {
    return null;
  }
}

module.exports = authFilter;
