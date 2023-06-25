//function validates the each and every routes token
function validateToken(req,res,next){
    var token = req.headers.authorization.split(' ')[1];
    const verifyToken = jwt.verify(token , jwtSecrete)
    if(verifyToken){
        next()
    }else{
        res.status(401).send("UnAuthorised User")
    }
}

module.exports = validateToken;