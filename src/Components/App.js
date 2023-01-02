import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import RoutePath from "./RoutePath";
import Contact from './Contact';
import styled from "styled-components";


function App() {
  return (
    <>
      <Router>
        <Header />
        <RoutePath />
        <Contact />
      </Router>
    </>
  );
}

export default App;
