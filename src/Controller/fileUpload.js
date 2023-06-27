const upload = require("../Helpers/fileHandler");

//controller handle the single file upload 
const singleFileUpload = (req,res) => {
    upload.single('file')(req,res, (err) => {
        console.log(req.file)
        if(err){
            res.status(400).send('Error in uploading file :|');
        }else{
            res.json("single file uploaded successfully!!");
        }
     })
}

//controller handle the multiple file upload
const multipleFileUpload = (req,res) => {
    upload.array('files')(req,res, (err) => {
        console.log(req.files)
        if(err){
            res.status(400).send('Error in uploading file :|');
        }else{
            res.json("file uploaded successfully!!");
        }
     })
}

const multipleFileUpload_ = {
    post : multipleFileUpload
}
const singleFileUpload_ = {
    post : singleFileUpload
}

module.exports = {
    singleFileUpload_,
    multipleFileUpload_
};