import React from 'react'
import { styled } from 'styled-components';
import image from '../img/logo.jpg'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const Container = styled.div`
  flex:1;
  background-color: black;
  height: 100vh;
  color: white;
  font-size: 14px;
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
`;

const Img = styled.img`
  height: 25px;
`;

export const Menu = () => {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src={image}/>
          vidStream
        </Logo>
        <Item>
          Hoome
          <HomeOutlinedIcon />
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu;
