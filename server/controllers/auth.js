const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req,res,next)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hashSync(req.body.password,salt);
        const newUser = await User.create({...req.body, password:hash});
        if(newUser){
            const {password, ...user} = newUser._doc;
            res.status(201).json(user);
        }
        else{
            const err = new Error("User exist already.")
            err.status=401;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
}

module.exports.signIn = async (req,res,next)=>{
    try{
        const user = await User.findOne({name:req.body.name});
        if(!user){
            const err = new Error("User not found!")
            err.status=404;
            throw err;
        }
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect){
            const err = new Error("Invalid credentials")
            err.status=400;
            throw err;
        }
        const {password, ...other} = user._doc;
        const token = jwt.sign({id:user._id}, process.env.JWT_SEC_KEY);
        res.cookie("access_token", token, {
            httpOnly:true,
            maxAge:1200000
        });
        console.log("cookie created successfully", token);
        res.status(200).json(other);
    }
    catch(err){
        next(err);
    }
}

module.exports.googleAuth = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SEC_KEY);
            res.cookie("access_token", token, {
                httpOnly:true
            }).status(200).json(user._doc);
        }
        else{
            const newUser = await User.create({...req.body, fromGoogle:true});
            const token = jwt.sign({id:user._id}, process.env.JWT_SEC_KEY);
            res.cookie("access_token", token, {
                httpOnly:true
            }).status(200).json(newUser._doc);
        }
    }catch(err){
        next(err);
    }
}