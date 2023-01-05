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
font-family: Arial, sans-serif;
`

const StyledApp = styled.div`
  @media (min-width: 1500px){
    margin-left: 200px;
    margin-right: 200px;
  }
  margin-left: 100px;
  margin-right: 100px;
  @media (max-width: 699px) {
    margin-left: 10px;
    margin-right: 10px;
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
          <div id="contact">
            <Contact />
          </div>
        </Router>
      </StyledApp>
    </AppContainer>
  );
}

export default App;
