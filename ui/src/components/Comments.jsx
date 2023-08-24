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

const Button = styled.button`
    background-color: teal;
    font-weight:500;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;

export const Comments = ({videoId}) => {
    const [comments, setComments] = useState([]);
    const { currUser } = useSelector((state)=>state.user);
    const [post, setPost] = useState("");
    const [updated, setUpdated] = useState(false);

    useEffect(()=>{
        const fetchComments = async ()=>{
            try{
                const comRes = await axios.get(`http://localhost:6789/api/comment/${videoId}`);
                setComments(comRes.data);
            }catch(err){
            }
        }
        fetchComments();
    }, [videoId,updated])


    const handleComment = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:6789/api/comment/',{videoId:videoId, desc:post}, {withCredentials:true, credentials:'include'});
            setUpdated(!updated);
        }
        catch(err){

        }
    }


  return (
    <Container>
        {currUser && (
        <NewComment>
            <Avatar src={currUser.img} />
            <Input placeholder='Add a comment' onChange={(e)=>setPost(e.target.value)}/>
            <Button onClick={handleComment}>
                Comment
            </Button>
        </NewComment> )}
        
        {comments.map(comment=>(
            <Comment key={comment._id} comment={comment} />
        ))}
    </Container>
  )
}
