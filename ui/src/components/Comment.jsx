import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { format } from 'timeago.js';

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`;

const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius:50%;
`;

const Details=styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({theme})=>theme.text};
`;

const Name=styled.span`
    font-size: 13px;
    font-weight: 500;
`;
const Date=styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme})=>theme.textSoft};
    margin-left: 5px;
`;
const Text=styled.span`
    font-size: 14px;
`;


export const Comment = ({comment}) => {
    const [channel,setChannel] = useState({});
    const imgSrc = 'http://localhost:6789/images/';

    useEffect(()=>{
        const fetchChannel = async()=>{
            try{
                const channelRes = await axios.get(`http://localhost:6789/api/user/find/${comment.userId}`);
                setChannel(channelRes.data);
            }catch(err){

            }
        }
        fetchChannel();
    },[comment.userId]);
  return (
    <Container>
        <Avatar src={imgSrc+channel.img} />
        <Details>
            <Name>{channel.name} <Date> {format(comment.createdAt)} </Date> </Name>
            <Text>{comment.desc}</Text>
        </Details>
    </Container>
  )
}
