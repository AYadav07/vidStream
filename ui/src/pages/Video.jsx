import React from 'react'
import { styled } from 'styled-components'
import { Comments } from '../components/Comments';
import { Card } from '../components/Card';

const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;

const Recommendation = styled.div`
    flex: 2;
`;

const VideoWrapper = styled.div`

`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({theme})=>theme.text};
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Info = styled.span`
    color: ${({theme})=>theme.textSoft};
`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({theme})=>theme.text};
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 3px;
`;

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid #999;
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`;

const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight:500;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius:50%;
`;

const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme})=>theme.text};
`;

const ChannelName = styled.div`
    font-weight: 500;
`;

const ChannelCounter = styled.div`
    margin-top: 5px;
    margin-bottom: 20px;
    color: ${({theme})=>theme.textSoft};
    font-size: 12px;
`;

const Description = styled.div`
    font-size: 14px;
`;

export const Video = () => {
  return (
    <Container>
        <Content>
            <VideoWrapper>

            </VideoWrapper>
            <Title>Test Video</Title>
            <Details>
                <Info>6712531235 views . 12 tarikh isi mahine</Info>
                <Buttons>
                    <Button>button1</Button>
                    <Button>button2</Button>
                    <Button>button3</Button>
                </Buttons>
            </Details>
            <Hr />
            <Channel>
                <ChannelInfo>
                    <Image />
                    <ChannelDetail>
                        <ChannelName>xyz</ChannelName>
                        <ChannelCounter>109090909</ChannelCounter>
                        <Description>ote that the development build is not optimized.
To create a production build, use npm run build.webpack compiled successfully</Description>
                    </ChannelDetail>
                </ChannelInfo>
                <Subscribe>SUBSCRIBE</Subscribe>
            </Channel>
            <Hr />
            <Comments />
        </Content>
        <Recommendation>
            <Card type={"sm"}/>
        </Recommendation>
    </Container>
  )
}
