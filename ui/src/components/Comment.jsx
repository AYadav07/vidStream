import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
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


export const Comment = () => {
  return (
    <Container>
        <Avatar />
        <Details>
            <Name>comm1 <Date>5 day before</Date> </Name>
            <Text>Comnjkdqwadnjqawhdquhjnasbdhwdwu
                yqwedqwihacdhweubcuywebywBQWHUQWYQWQWAJSDH JHDQWHD ADUHQWUHD AUWDHQW jkshH MNZBCJKZ
                sdjkocjsoijf asjcdiojpopsK zxmnJKxH 
                MXAXJOPOPAX
                AWYDGUYADUYAWDGQWG</Text>
        </Details>
    </Container>
  )
}
