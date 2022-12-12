import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import RoutePath from "./RoutePath";
import Contact from './Contact';
import Storage from "./Storage";

function App() {
  return (
    <Router>
      <Header />
      <Storage />
      <RoutePath />
      <Contact />
    </Router>
  );
}

export default App;
