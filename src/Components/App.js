import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import RoutePath from "./RoutePath";
import Contact from './Contact';
import styled from "styled-components";

const AppContainer = styled.div`
display: flex;
justify-content: center;
@import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');
font-family: 'DM Sans', sans-serif;
`

const StyledApp = styled.div`
  width: 90%;
  margin-top: 10px;
  @media (max-width: 699px) {
    margin-left: 10px;
    margin-right: 10px;
    width: 95%;
  }
`

function App() {

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      behavior: 'smooth',
    });
  }

  return (
    <AppContainer>
      <StyledApp>
        <Router>
          <Header handleScroll={handleScroll}/>
          <RoutePath />
          <Contact />
        </Router>
      </StyledApp>
    </AppContainer>
  );
}

export default App;
