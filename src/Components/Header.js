import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {

  const [toggle, setToggle] = useState(false);

  const Header = styled.div`
    background-color: #ADD8E6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const HeaderLinkContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    @media (max-width: 700px) {
      display: none
    }
  `;

  const HeaderLink = styled(NavLink)`
    border: solid 1px black;
    text-decoration: none;
    margin: 1em;
    cursor: pointer;
    &:hover {
    text-decoration: underline;
    }
  `;

  const StyledLink = styled(NavLink)`
    align-items: center;
    color: black;
    display: flex;
    justify-content: center;
    margin: 1rem;
    text-decoration: none;
  `;

  const HamburgerToggle = styled.div`
    @media (min-width: 699px) {
      display: none;
    }
  `

  return (
    <div>
      <Header>
        <h1>Movement Mastering</h1>
          <HeaderLinkContainer>
            <HeaderLink>
              <StyledLink to="/">Home</StyledLink>
            </HeaderLink>
            <HeaderLink>
            <StyledLink to="/">Home</StyledLink>
            </HeaderLink>
          </HeaderLinkContainer>
          <HamburgerToggle>
            <button onClick={() => setToggle(!toggle)}>Open</button>
            {toggle && (
              <>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/">Home</StyledLink>
              </>
            )}
          </HamburgerToggle>
      </Header>
    </div>
  );
}

export default Header;