const express = require("express");
const app = express();
const PORT = 6789;
const mongoose = require('./config/mongoose');



app.listen(PORT, ()=>{
    console.log("Backend app server started at port: ", PORT);
})