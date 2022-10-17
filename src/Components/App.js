import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import PortfolioControl from "./PortfolioControl";
import Contact from './Contact';
import Faq from "./Faq";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route Path="/faq" element={<Faq />} />
        <Route Path="/" element={<PortfolioControl />} />  
      </Routes>
      <Contact />
    </Router>
  );
}

export default App;
