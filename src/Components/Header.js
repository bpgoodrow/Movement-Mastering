import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>Movement Mastering</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
      <NavLink to="/login">Login</NavLink>
      {/* <NavLink to="/indierate">Indie Rate</NavLink>
      <NavLink to="/labelrate">Lable Rate</NavLink> */}
    </div>
  );
}

export default Header;