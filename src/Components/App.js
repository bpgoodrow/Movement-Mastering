import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import RoutePath from "./RoutePath";
import Contact from './Contact';
import StorageTest from "./StorageTest";

function App() {
  return (
    <Router>
      <StorageTest />
      <Header />
      <RoutePath />
      <Contact />
    </Router>
  );
}

export default App;
