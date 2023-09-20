import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useSelector, useDispatch} from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { loginSuccess } from '../redux/userSlice';
import { Card } from '../components/Card';

const Container = styled.div`
    /* display: flex;
    justify-content: center; */
    //background-color: yellow; 
`;

const Wrapper = styled.div`
    margin-top: 20px;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto 13;
    border: 1px solid #DDD;
    border-radius: 5px;
    overflow:hidden;
    margin: 0;
    padding: 0;
    background-color: #928f8f;
`;

const CoverImg = styled.img`
    height: 320px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const Items = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    position: relative;
`;

const MainImg = styled.img`
    border:1px solid #EEEEEE;
    width:400px;
    height:300px;
    float:left;
    margin:-130px 10px 0  20px;
    z-index:111;
    object-fit: cover;
    border-radius: 5px;
    background-color:white;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 30px;
    font-weight: 500;
`;

const Input = styled.input`
    width: auto;
    font-size: 20px;
    font-weight: 500;
    padding-left: 10px;
`;

const ImageDiv = styled.div`
    position: relative;
`;

const Button = styled.button`
    position: absolute;
    right: 20px;
    bottom: 5px;
    height: 26px;
    width: 56px;
    padding: 3px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

const Edit = styled.div`
    position: absolute;
    right: 10px;
    bottom: 0;
    background-color: rgba(255,255,255,0.5);
    padding: 10px 5px 5px 10px;
    border: 1px solid white;
    border-radius: 100% 0 0 0;
    cursor: pointer;
`;

const VideoConatiner = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 10px;
`;

const H3 = styled.h2`
    margin: 20px 0 10px;
    text-align: center;

`;

export const Profile = () => {
    const { currUser } = useSelector((state)=>state.user);
    const [updateMode, setUpdateMode] = useState(false);
    const [name, setName] = useState(currUser.name);
    const [email, setEmail] = useState(currUser.email);
    const [file,setFile] = useState(null);
    const imgSrc = 'http://localhost:6789/images/';
    const dispatch = useDispatch()
    const [videos, setVideos] = useState([]);


    useEffect(()=>{
        const fetchVideo = async ()=>{
          const res = await axios.get(`http://localhost:6789/api/user/${currUser._id}`);
          setVideos(res.data);
        }
        fetchVideo();
      },[currUser._id]);

    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const updatedUser = {
            name,email
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.img = filename;
            try{
                const res = await axios.post("http://localhost:6789/upload", data);
                console.log(res);
              }
              catch(err){
                console.log(err);
              }
        }

        try{
            const res = await axios.put("http://localhost:6789/api/user/"+currUser._id, updatedUser, {withCredentials:true});
            console.log(res);
            dispatch(loginSuccess(res.data));
        }
        catch(err){
            console.log(err);
        }
        

        setUpdateMode(false);
    }

  return (
  <Container>
    <Wrapper>
        <ProfileContainer>
            <CoverImg src='http://1.bp.blogspot.com/_Ym3du2sG3R4/S_-M_kTV9OI/AAAAAAAACZA/SNCea2qKOWQ/s1600/mac+os+x+wallpaper.jpg' />
            <Items>
            <Item>
                <ImageDiv>
                    <MainImg src={file ? URL.createObjectURL(file) : imgSrc+currUser.img} />
                    {updateMode && <Edit>
                        <label htmlFor="fileInput">
                        <ModeEditIcon />
                        </label>
                        <input type="file" id='fileInput' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
                        </Edit>}
                </ImageDiv>
                
            </Item>
            <Item>
                <span>Name</span>
                {   updateMode ?
                    (<Input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} />) :
                    (<span>{name}</span>)
                }
            </Item>
            <Item>
                <span>Email</span>
                {   updateMode ?
                    (<Input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} />) :
                    (<span>{email}</span>)
                }
            </Item>
            <Item>
                <span>Subscribers</span>
                <span>{currUser.subscribers}</span>
            </Item>
            {updateMode ? 
                (<Button onClick={handleSubmit}>
                    Save
                </Button>) : 
                (<Button onClick={(e)=>setUpdateMode(true)}>
                    Edit
                </Button>)
            }
            
            </Items>
            
        </ProfileContainer>
        <H3>Video Uploaded</H3>
        <VideoConatiner>
            {videos.map((video)=>(
            <Card key={video._id} video={video} />
            ))}
        </VideoConatiner>

    </Wrapper>

  </Container>
  )
}
