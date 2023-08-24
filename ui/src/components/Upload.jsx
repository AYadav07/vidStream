import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
//import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchSuccess } from '../redux/videoSlice';


const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({theme})=> theme.bgLighter};
    color: ${({theme})=> theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`;
const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;
const Title = styled.h1`
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid ${({theme})=> theme.soft};;
    color: ${({theme})=> theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Desc = styled.input`
    border: 1px solid ${({theme})=> theme.soft};;
    color: ${({theme})=> theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Label = styled.label`
    font-size: 14px;
`;


export const Upload = ({setOpen, videoId}) => {

    const [img, setImg] = useState(null);
    const [video,setVideo] = useState(null);
    const [imgPer, setImgPer] = useState(0);
    const [videoPer, setVideoPer] = useState(0);
    const [inputs, setInputs] = useState("");
    const [tags, setTags] = useState([]);
    const nevigate = useNavigate();

    const handleChange = (e)=>{
        setInputs(prev=>{
            return {...prev, [e.target.name]:e.target.value};
        })
    }

    const handleTags = (e)=>{
        setTags(e.target.value.split(","));
    }

    const uploadFile = (file, urlType)=>{
        const storage = getStorage(); //app as argument
        const filename = new Date().getTime() + file.name;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
       

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgURL" ? setImgPer(Math.round(progress)) : setVideoPer(Math.round(progress));
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default :
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev)=>{
                        return {...prev, [urlType]:downloadURL};
                    })
                });
            }
            );
    }

    const uploadFileLocal = async (file,urlType)=>{
        const data = new FormData();
        const filename = Date.now()+file.name;
        data.append("name",filename);
        data.append("file",file);
        try{
            const res = await axios.post("http://localhost:6789/upload", data);
            setInputs((prev)=>{
                return {...prev, [urlType]:filename};
            });
        }
        catch(err){

        }
    }

    useEffect(()=>{
        video && uploadFileLocal(video,"videoURL");
    },[video]);

    useEffect(()=>{
        img && uploadFileLocal(img,"imgURL");
    },[img]);

    const handleUpload = async (e)=>{
        e.preventDefault();
        try{
            if(!videoId){
                const res = await axios.post('http://localhost:6789/api/video',{...inputs, tags},{withCredentials:true, credentials:'include'});
                setOpen(false);
                res.status ===200 && nevigate(`/vedio/${res.data._id}`);
            }else{
                const res = await axios.put(`http://localhost:6789/api/video/${videoId}`,{...inputs, tags}, {withCredentials:true, credentials:'include'});
                setOpen(false);
                res.status ===200 && nevigate(`/vedio/${res.data._id}`);
            }
            

        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)} >X</Close>
            {!videoId && <>
                <Title> Upload a video</Title>
                <Label> Video : </Label>
                { videoPer>0 ? ("Uploading : "+ videoPer+"%"):
                (<Input type='file' accept='video/*' onChange={e=>setVideo(e.target.files[0])} />) }
                </> }
            <Input type='text' placeholder='Title' name='title' onChange={handleChange} />
            <Desc placeholder='Description' name='description' onChange={handleChange} />
            <Input type='text' placeholder='Separate tags with commas (,)' onChange={handleTags} />
            <Label> Image : </Label>
            { imgPer>0 ? ("Uploading : "+ imgPer + "%") :
            (<Input type='file' accept='image/*' onChange={e=>setImg(e.target.files[0])} />) }
            <Button onClick={handleUpload} > Upload </Button>
        </Wrapper>
    </Container>
  )
}
