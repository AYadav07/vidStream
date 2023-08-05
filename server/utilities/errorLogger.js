const fs = require("fs");

const errorLogger = async (err,req,res,next)=>{
    try{
        var errMessage = `${new Date()} ${err.message} \n`;
        await fs.appendFile('errorLog.txt',errMessage,(error)=>{
            if(error){
                console.log("Errr in log")
            }
            if(err.status)
                res.status(err.status);
            else{
                res.status(500);
                err.status=500;
            }
            res.json({
                success:false,
                status:err.status,
                message:err.message,
            });
        });
        
    }
    catch(err){
        console.log("Error in logging", err);
        next();
    }
}

module.exports = errorLogger;