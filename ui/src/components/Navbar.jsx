import React, { useState } from 'react'
import { styled } from 'styled-components';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import { Upload } from './Upload';
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice';


const Container = styled.div`
  position: sticky;
  top: 0;
  margin-top: 15px;
  background-color: ${({theme})=> theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({theme})=> theme.text};
  background-color: ${({theme})=> theme.bgLighter};
`;

const Input = styled.input`
  border: none;
  color: ${({theme})=> theme.text};
  background-color: ${({theme})=> theme.bgLighter};
  width:100%;
  padding: 0 5px;
  &:focus{
    outline: none;
  }
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

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  color: ${({theme})=> theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const { currUser } = useSelector(state=>state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const dispatch = useDispatch();
  const imgSrc = 'http://localhost:6789/images/';

  const handleLogout = (e)=>{
    e.preventDefault();
    dispatch(logout());
    window.location.replace("/");
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={(e)=>setQ(e.target.value)} />
            <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)} />
          </Search>
          { currUser ? 
            (<User>
              <WhatshotOutlinedIcon onClick={()=>setOpen(true)} />
              <Link to={"profile"}>
                <Avatar src={imgSrc+currUser.img} />
              </Link>
              <Button>
                <AssignmentIndOutlinedIcon onClick={handleLogout}/>
              </Button>
            </User>)
          :
            (<Link to="signin" style={{textDecoration:"none"}}>
              <Button>
                <AssignmentIndOutlinedIcon />
                Sign In
              </Button>
            </Link>) 
          }
        </Wrapper>
      </Container>
      {open && <Upload setOpen = {setOpen} videoId={null} /> }
    </>
  )
}

export default Navbar;