import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Card } from '../components/Card';
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 10px;
`;
export const Tags = ({tags}) => {

  const dep=tags[0];
  const [videos, setVideos] = useState([]);

  useEffect(()=>{
    const fetchVideo = async ()=>{
      const res = await axios.get(`http://localhost:6789/api/video/tags?tags=${tags}`);
      setVideos(res.data);
    }
    fetchVideo();
  },[dep]);

  return (
    <Container>
        {videos.map((video)=>(
          <Card key={video._id} video={video} />
        ))}
    </Container>
  )
}
