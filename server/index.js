const express = require("express");
const app = express();
const PORT = 6789;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require('./config/mongoose');
const routes = require("./routes");
const errorLogger = require("./utilities/errorLogger");

dotenv.config();
app.use(cookieParser());
app.use(express.json());


app.use("/",routes);
app.use(errorLogger);
app.listen(PORT, ()=>{
    console.log("Backend app server started at port: ", PORT);
})