import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Comments } from '../components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import { Recomendation } from '../components/Recomendation';
import { Upload } from '../components/Upload';

const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;


const VideoWrapper = styled.div`

`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({theme})=>theme.text};
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Info = styled.span`
    color: ${({theme})=>theme.textSoft};
`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({theme})=>theme.text};
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 3px;
`;

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid #999;
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`;

const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight:500;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius:50%;
`;

const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme})=>theme.text};
`;

const ChannelName = styled.div`
    font-weight: 500;
`;

const ChannelCounter = styled.div`
    margin-top: 5px;
    margin-bottom: 20px;
    color: ${({theme})=>theme.textSoft};
    font-size: 12px;
`;

const Description = styled.div`
    font-size: 14px;
`;

const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
`;

export const Video = () => {
    const { currUser } = useSelector((state)=>state.user);
    const { currVideo } = useSelector((state)=>state.video);
    const dispatch = useDispatch();
    const imgSrc = 'http://localhost:6789/images/';
    const vidSrc = 'http://localhost:6789/videos/';
    const navigate = useNavigate();

    const path = useLocation().pathname.split('/')[2];

    //const [video,setVideo] = useState({});
    const [channel,setChannel] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                
                const videoRes = await axios.get(`http://localhost:6789/api/video/find/${path}`);
                const channelRes = await axios.get(`http://localhost:6789/api/user/find/${videoRes.data.userId}`);
                dispatch(fetchSuccess(videoRes.data));
                setChannel(channelRes.data);
                console.log(channelRes);
            }catch(err){

            }
        }
        fetchData();
    },[path,dispatch]);

    const handleLike = async (e)=>{
        e.preventDefault();
        try{
            if(currUser){
            await axios.put(`http://localhost:6789/api/user/like/${currVideo._id}`, {Headers: {'Content-Type':'application/json'}}, {withCredentials:true});
            dispatch(like(currUser._id))
            }
        }
        catch(err){

        }
    }
    const handleDislike = async (e)=>{
        e.preventDefault();
        try{
            if(currUser){
                await axios.put(`http://localhost:6789/api/user/dislike/${currVideo._id}`, {Headers: {'Content-Type':'application/json'}}, {withCredentials:true});
                dispatch(dislike(currUser._id))
            }
        }
        catch(err){
        }
    }

    const handleSub = async (e)=>{
        e.preventDefault();
        try{
            currUser.subscribedChannels.includes(channel._id) ?
            await axios.put(`http://localhost:6789/api/user/unsub/${channel._id}`, {Headers: {'Content-Type':'application/json'}}, {withCredentials:true}):
            await axios.put(`http://localhost:6789/api/user/sub/${channel._id}`, {Headers: {'Content-Type':'application/json'}}, {withCredentials:true});
            dispatch(subscription(channel._id));
        }
        catch(err){
        }
    }

    const handleDelete = async (e)=>{
        e.preventDefault();
        try{
            
            await axios.delete(`http://localhost:6789/api/video/${currVideo._id}`, {withCredentials:true});
            navigate("/");
        }
        catch(err){
        }
    }


    
    if (!currVideo || Object.keys(channel).length===0) {
        return null; // Or render a loading state or message
    }
  return (
    <>
        <Container>
        {currVideo && (<>
        <Content> 
            <VideoWrapper>
                <VideoFrame controls><source src={vidSrc+currVideo.videoURL} /></VideoFrame>
            </VideoWrapper>
            <Title>{currVideo.title}</Title>
            <Details>
                <Info>{Math.floor(currVideo.views/2)} views . {format(currVideo.createdAt)}</Info>
                <Buttons>
                    <Button onClick={handleLike} >
                        {currVideo.likes?.includes(currUser?._id) ? 
                        ("buttonLiked") : ("buttonLike") }
                        {currVideo.likes?.length}
                    </Button>
                    <Button onClick={handleDislike} >
                        {currVideo.dislikeslikes?.includes(currUser?._id) ? 
                        ("buttonDisliked") : ("buttonDislike") }
                    </Button>
                    <Button>button3</Button>
                    {currUser && currUser._id === currVideo.userId && (
                        <><Button onClick={handleDelete}>Delete</Button>
                        <Button onClick={(e)=>setOpen(true)}>Update</Button></>
                        
                    )}
                </Buttons>
            </Details>
            <Hr />
            <Channel>
                <ChannelInfo>
                    <Image src={imgSrc+channel.img} />
                    <ChannelDetail>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelCounter>
                            {channel.subscribers}
                        </ChannelCounter>
                        <Description> {currVideo.desc} </Description>
                    </ChannelDetail>
                </ChannelInfo>
                <Subscribe onClick={handleSub}>
                    {currUser?.subscribedChannels?.includes(channel._id) ? "SUBSCRIBED" : 
                    "SUBSCRIBE" }</Subscribe>
                </Channel>
                <Hr />
                <Comments videoId = {currVideo._id}/>
            </Content>
            <Recomendation tags={currVideo.tags} /> </>)}
        </Container>
        {open && <Upload setOpen = {setOpen} videoId={currVideo._id} />}
    </>
  )
}
