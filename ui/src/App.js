import styled, { ThemeProvider } from 'styled-components';
import Menu  from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';

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
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
      <Main>
        <Navbar />
        <Wrapper>
          Video Card
        </Wrapper>
      </Main>

    </Container>
    </ThemeProvider>
  );
}

export default App;
