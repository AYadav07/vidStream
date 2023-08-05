const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    imgURL:{
        type:String,
    },
    videoURL:{
        type:String,
        required:true,
    },
    views:{
        type: Number,
        default: 0,
    },
    tags:{
        type:[String],
        default:[],
    },
    likes:{
        type:[String],
        default:[],
    },
    dislikes:{
        type:[String],
        default:[],
    },
},
{
    timestamps:true,
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;