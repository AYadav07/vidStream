const express = require("express");
const app = express();
const PORT = 6789;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require('./config/mongoose');
const routes = require("./routes");
const errorLogger = require("./utilities/errorLogger");

app.use(cors());
dotenv.config();
app.use(cookieParser());
app.use(express.json());


app.use("/api",routes);
app.use(errorLogger);
app.listen(PORT, ()=>{
    console.log("Backend app server started at port: ", PORT);
})