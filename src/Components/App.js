import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import RoutePath from "./RoutePath";
import Contact from './Contact';

function App() {
  return (
    <Router>
      <Header />
      <RoutePath />
      <Contact />
    </Router>
  );
}

export default App;
