import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components'
//import { format } from 'timeago.js';
import axios from "axios";


const Container = styled.div`
    width: ${(props)=>props.type!=="sm"&&"380px"};
    margin-bottom: ${(props)=>props.type==="sm"?"10px":"45px"};
    cursor: pointer;
    display: ${(props)=>props.type==="sm" && "flex"};
    gap:10px;
    justify-content: ${(props)=>props.type==="sm"&&"space-between"};
`;

const Img = styled.img`
    flex: 5;
    width: 100%;
    height: ${(props)=>props.type==="sm"?"120px":"200px"};
    background-color: #999;
    cursor: pointer;
    
`;

const Details = styled.div`
    flex: 3;
    display:flex;
    margin-top: ${(props)=>props.type !=="sm"&&"16px"};
    gap: 12px;
`;

const ChannelImg = styled.img`
    display: ${(props)=>props.type==="sm" && "none"};
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
`;

const Texts = styled.div`
    
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({theme}) => theme.text };
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft };
    margin: 7px 0;
`;

const Info = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft };
`;
export const Card = ({type, video}) => {

    const [channel, setChannel] = useState({});

    useEffect(()=>{
        const fetchChannel = async ()=>{
        const res = await axios.get(`http://localhost:6789/api/user/find/${video.userId}`);
        setChannel(res.data);
    }
    fetchChannel();
  },[video.userId]);


  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
        <Container type={type}>
            <Img type={type} src={video.imgURL} />
            <Details type={type} >
                <ChannelImg type={type} src={channel.img} />
                <Texts>
                    <Title>{video.title}</Title>
                    <ChannelName> {channel.name} </ChannelName>
                    <Info>{video.views} views . {video.createdAt} </Info>
                </Texts>
            </Details>
        </Container>
    </Link>
  )
}
