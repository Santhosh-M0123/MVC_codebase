const upload = require("../Helpers/fileHandler");
const fileUpload = (req,res) => {
    console.log(req.file);
    res.send("req received");
}

module.exports = {
    post : fileUpload
};