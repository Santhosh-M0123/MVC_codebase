const routes = require("../Routes/api");//module imports from controllerer directory index.js

function apiFilter(url, method) {
  // let meth = toLowerCase(method)
  let reqMethod = method.toLowerCase();

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

module.exports = apiFilter;
