const express = require("express");
const app = express();
const PORT = 6789;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require('./config/mongoose');
const routes = require("./routes");
const errorLogger = require("./utilities/errorLogger");
const multer = require("multer");
const path = require('path');

const whiteList = ['http://localhost:3000', 'http://localhost:6789']

const corsOption = {
    credentials:true,
    exposedHeaders:["set-cookie"],
    origin:(origin,callback)=>{
        if(!origin || whiteList.indexOf(origin)!==-1)
            callback(null, true);
        else    callback(new Error("Not allowed by cors: "+origin))
    },
    optionSuccessStatus:200
};

app.use(cors(corsOption));
//app.use(cors({origin:true, credentials:true }));
dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname,'uploads/images')));
app.use("/videos", express.static(path.join(__dirname,'uploads/videos')));


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        if(/jpeg|jpg|png|gif/.test(file.mimetype)){ //file.mimetype==='image|jpeg|png
            cb(null,"uploads/images");
        }
        else{
            cb(null,'uploads/videos');
        }
    },
    filename:function(req, file, cb){
        cb(null,req.body.name);
    }
})

const upload = multer({storage:storage});
app.post("/upload", upload.single("file"), (req,res)=>{
    console.log("File uploaded successfully.");
    res.status(200).json("File uploaded successFUlly.");
})

app.use("/api",routes);
app.use(errorLogger);
app.listen(PORT, ()=>{
    console.log("Backend app server started at port: ", PORT);
})