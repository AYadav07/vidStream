import React from 'react'
import { styled } from 'styled-components'
import { Card } from '../components/Card';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 10px;
`;
export const Home = () => {
  return (
    <Container>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

    </Container>
  )
}
