import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Comment } from './Comment';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Container = styled.div`

`;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius:50%;
`;

const Input = styled.input`
    border:none;
    border-bottom: 1px solid ${({theme})=>theme.soft};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
`;

export const Comments = ({videoId}) => {
    const [comments, setComments] = useState([]);
    const { currUser } = useSelector((state)=>state.user);

    useEffect(()=>{
        const fetchComments = async ()=>{
            try{
                const comRes = await axios.get(`http://localhost:6789/api/comment/${videoId}`);
                setComments(comRes.data);
            }catch(err){
            }
        }
        fetchComments();
    }, [videoId])
  return (
    <Container>
        <NewComment>
            <Avatar src={currUser.img} />
            <Input placeholder='Add a comment' />
        </NewComment>
        {comments.map(comment=>(
            <Comment key={comment._id} comment={comment} />
        ))}
    </Container>
  )
}
