const User = require("../models/User");
const Video = require("../models/Video");
const path = require('path');
const fs = require("fs");

module.exports.addVideo = async (req,res,next)=>{
    try{
        console.log(req.body);
        const newVideo = await Video.create({userId:req.user.id, ...req.body});
        res.status(200).json(newVideo);
    }
    catch(err){
        next(err);
    }
}

module.exports.updateVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video){
            const err = new Error("Invalid video Id");
            err.status=404;
            return next(err);
        }

        if(video.userId!==req.user.id){
            const err = new Error("You can only update your video");
            err.status=403;
            return next(err);
        }

        const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
            $set:req.body,
        },{new : true});

        res.status(200).json(updateVideo);
    }
    catch(err){
        next(err);
    }
}

module.exports.deleteVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video){
            const err = new Error("Invalid video Id");
            err.status=404;
            return next(err);
        }

        if(video.userId!==req.user.id){
            const err = new Error("You can only delete your video");
            err.status=403;
            return next(err);
        }
        const url = video.videoURL;
        const imgurl = video.imgURL;

        fs.unlink(path.join(__dirname,"../uploads/images",imgurl),(err)=>{
            if(err)
                throw err;
        });
        fs.unlink(path.join(__dirname,"../uploads/videos",url),(err)=>{
            if(err)
                throw err;
        });

        await Video.findByIdAndDelete(req.params.id);

        res.status(200).json("Video deleted");
    }
    catch(err){
        next(err);
    }
}

module.exports.getVideo = async (req,res,next)=>{
    try{
        
        const video =  await Video.findByIdAndUpdate(req.params.id, {
            $inc:{views:1}
        },{new:true});
        //const v = await Video.findById(req.params.id);
        if(!video){
            const err = new Error("Invalid video Id");
            err.status=404;
            return next(err);
        }
        res.status(200).json(video);
    }
    catch(err){
        next(err);
    }
}

module.exports.addView = async (req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id, {
            $inc:{views:1}
        });

        res.status(200).json("The view has been increased.");
    }
    catch(err){
        next(err);
    }
}

module.exports.getTrend = async (req,res,next)=>{
    try{
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}

module.exports.getRandom = async (req,res,next)=>{
    try{
        //console.log(req.cookies);
        const videos = await Video.aggregate([{$sample:{size : 40}}]);
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}

module.exports.addSub = async (req,res,next)=>{
    try{
        console.log("in sub")
        const user = await User.findById(req.user.id);
        const subChannels = user.subscribedChannels;

        const list = await Promise.all(
            subChannels.map(channelId => {
                Video.find({userId:channelId})
            })
        );
        res.status(200).json(list.flat().sort((a,b)=> b.createdAt-a.createdAt));
    }
    catch(err){
        next(err);
    }
}

module.exports.getByTags = async (req,res,next)=>{
    try{
        const tags = req.query.tags.split(",");
        const videos = await Video.find({tags: {$in: tags} }).limit(20) ;
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}

module.exports.search = async (req,res,next)=>{
    try{
        const query = req.query.q;
        const videos = await Video.find({title : { $regex : query, $options : "i"}}).limit(40);
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}