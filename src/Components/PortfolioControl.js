import React from "react";
import Portfolio from "./Portfolio";
import PortfolioForm from "./PortfolioForm";
import Login from "./Login";

const PortfolioControl = () => {
  return(
    <div>
      <h2>PortfolioControl</h2>
      <Portfolio />
      <PortfolioForm />
      <Login />
    </div>
  )
}

export default PortfolioControl;