const data = {
    name : 'santhosh'
}

function GetData(req,res){
    res.send(data)
}

module.exports = {
    get : GetData
}