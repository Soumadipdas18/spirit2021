const express = require("express");
const app = express.Router();
const bodyParser=require('body-parser');
const stuff_user = require("../model/user");
const multer = require('multer');

var urlencodedParser = bodyParser.urlencoded({ extended : false });

//define storage for the images

const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
        callback(null, './public/images/shutterbug_submissions');
    },
  
    //add back the extension
    filename: function (req, file, callback) {
      callback(null,Date.now() + " " +file.originalname);
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if( file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
            if(file.size <= 1024 * 1024 * 3){
                callback(null, true)
            }
            else{
                callback(null, false)
            }
        }else{
            console.log("Only png, jpg and jpeg files are supported!");
            callback(null, false)
        }
    },
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });

app.post('/', upload.single('image'), async (req, res) => {

    if(req.file){
        console.log(req.file.size)
        var email = req.body.email;
        const data = stuff_user.model.findOne({ email: email }).then(
            (data)=> {
                data.img = req.file.filename, 
                data.save()
                res
                    .status(200)
                    .contentType("text/plain")
                    .end("Image Uploaded!")   
            }
        )
        .catch(
            (error)=>{
                console.log(error);
                res
                .status(200)
                .contentType("text/plain")
                .end(error.message)
            }
        )
    }
    else{
        res
        .status(200)
        .contentType("text/plain")
        .end("Please check if the image uploaded is of format png, jpg or jpeg and is of size less than 3MB. Please try again")
    }

});

module.exports = app;  