import React from 'react'
import { styled } from 'styled-components';
import image from '../img/logo.jpg'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Container = styled.div`
  flex:1;
  background-color: ${({theme})=>theme.bg };
  height: 100vh;
  color: ${({theme})=>theme.text };
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom:25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;;
  gap: 20px;
  cursor: pointer;
  padding: 7px 0;
  &:hover{
    background-color: ${({theme})=>theme.soft};
  }
`;

const Hr = styled.hr`
margin: 15px 0;
border: 0.5px solid ${({theme})=>theme.soft };
`;

const Img = styled.img`
  height: 25px;
`;

const Login = styled.div`
margin-bottom: 15px;
`;

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 15px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`;

const Title = styled.h2`
font-size: 14px;
font-weight: 500;
color: #aaaaaa;
margin-bottom: 12px;
`;

export const Menu = ({darkMode, setDarkMode}) => {

  const { currUser } = useSelector(state=>state.user)

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
          <Logo>
            <Img src={image}/>
            vidStream
          </Logo>
        </Link>
        <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
          <Item>
            <HomeOutlinedIcon />
            Home
          </Item>
        </Link>
        
        <Link to="trends" style={{textDecoration:"none", color:"inherit"}}>
          <Item>
            <WhatshotOutlinedIcon />
            Trends
          </Item>
        </Link>

        <Item>
          <HistoryRoundedIcon />
          History
        </Item>
        <Link to="subscriptions" style={{textDecoration:"none", color:"inherit"}}>
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscription
          </Item>
        </Link>
        
        <Hr />
        <Link to="music" style={{textDecoration:"none", color:"inherit"}}>
          <Item>
            <AudiotrackOutlinedIcon />
            Music
          </Item>
        </Link>
        
        <Link to="movies" style={{textDecoration:"none", color:"inherit"}}>
          <Item>
            <MovieCreationOutlinedIcon />
            Movies
          </Item>
        </Link>
        <Hr />
        {!currUser && 
        <>
          <Login>
            Sign in to like videos, comment and subscribe.
            <Link to="signin" style={{textDecoration:"none"}}>
              <Button>
                <AssignmentIndOutlinedIcon />
                Sign In
              </Button>
            </Link>
          </Login>
        </>
        }
        <Title>Best of vidStream</Title>
        <Link to="sports" style={{textDecoration:"none", color:"inherit"}}>
          <Item>
            <EmojiEventsOutlinedIcon />
            Sports
          </Item>
        </Link>
        <Link to="gaming" style={{textDecoration:"none", color:"inherit"}}>
          <Item>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
        </Link>
        <Item onClick={()=>setDarkMode(!darkMode)}>
          <DarkModeOutlinedIcon />
          Change Theme
        </Item>
        <Hr />

      </Wrapper>
    </Container>
  )
}

export default Menu;
