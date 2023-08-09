const User = require("../models/User");
const Video = require("../models/Video");
const Comment = require("../models/Comments");

module.exports.addComment = async (req,res,next)=>{
    try{
        const newComment = await Comment.create({...req.body, userId : req.user.id});
        res.status(200).json(newComment);
    }
    catch(err){
        next(err);
    }
}

module.exports.getComments = async (req,res,next) => {
    try{
        const comments = await Comment.find({videoId:req.params.videoId});
        res.status(200).json(comments);
    }
    catch(err){
        next(err);
    }
}

module.exports.deleteComment = async (req,res,next)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);
        if(comment.userId===req.user.id || video.userId===req.user.id){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment Deleted");
        }
        const err = new Error("You are not authorised to delete this comment");
        err.status = 403;
        return next(err);
    }
    catch(err){
        next(err);
    }
}
