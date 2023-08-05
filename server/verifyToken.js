const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        const err = new Error("You are not authenticated");
        err.status = 401;
        next(err);
        return;
    }
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user)=>{
        if(err){
            const err = new Error("Invalid token");
            err.status = 403;
            next(err);
            return;
        }
        req.user=user;
        next();
    })
}

module.exports = verifyToken;