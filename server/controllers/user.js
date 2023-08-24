const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Video = require("../models/Video");


module.exports.update = async (req,res,next)=>{
    try{
        if(req.params.id===req.user.id){
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, {new:true});
            res.status(200).json(updatedUser);
        }
        else{
            const err = new Error("You can update only your account");
            err.status=403;
            return next(err);
        }
    }
    catch(err){
        next(err);
    }
}

module.exports.deleteUser = async (req,res,next)=>{
    try{
        if(req.params.id===req.user.id){
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }
        else{
            const err = new Error("You can delete only your account");
            err.status=403;
            return next(err);
        }
    }
    catch(err){
        next(err);
    }
}

module.exports.getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) res.status(404).json("User doesn't exist.");
        
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        next(err);
    }
}

module.exports.subscribe = async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedChannels:req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        });

        res.status(200).json("Subscription successfull");

    }
    catch(err){
        next(err);
    }
}

module.exports.unsubscribe = async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedChannels:req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: -1}
        });

        res.status(200).json("Subscription successfull");
    }
    catch(err){
        next(err);
    }
}

module.exports.like = async (req,res,next)=>{
    try{
        console.log(req.user);
        const id = req.user.id;
        const videoId = req.params.videoId;
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        });

        res.status(200).json(" The video has been liked.");
    }
    catch(err){
        next(err);
    }
}

module.exports.dislike = async (req,res,next)=>{
    try{
        const id = req.user.id;
        const videoId = req.params.videoId;
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        });

        res.status(200).json(" The video has been disliked.");
    }
    catch(err){
        next(err);
    }
}
