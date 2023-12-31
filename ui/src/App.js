import styled, { ThemeProvider } from 'styled-components';
import Menu  from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { Video } from './pages/Video';
import { SignIn } from './pages/SignIn';
import { Search } from './pages/Search';
import { Tags } from './pages/Tags';
import { Profile } from './pages/Profile';

const Container = styled.div`
display: flex;
margin: 0;
padding: 0;
`;

const Main = styled.div`
flex: 7;
background-color: ${({theme})=>theme.bg };
color: ${({theme})=>theme.text };
`;

const Wrapper = styled.div`
 
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="music" element={<Tags tags={["music","gana","song","mp3"]} />} />
                  <Route path="movies" element={<Tags tags={["movie","picture","cinema","film"]} />} />
                  <Route path='sports' element={<Tags tags={["sports","game","khel","match"]} />} />
                  <Route path='gaming' element={<Tags tags={["game","esports","onlinegaming","games"]} />} />
                  <Route path='signin' element={<SignIn />} />
                  <Route path='search' element={<Search />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
