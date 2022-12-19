import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { TbMenu, TbX} from "react-icons/tb";

const Header1 = styled.div`
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
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    @media (min-width: 699px) {
      display: none;
    }
    position: absolute;
    z-index: 1;
    right: 0;
  `

  const MovementMasteringLogo = styled.img`
    width: 200px;
  `

const Header = () => {

  const [toggle, setToggle] = useState(false);

  const open = <TbMenu />
  const close = <TbX />

  return (
    <div>
      <Header1>
        <MovementMasteringLogo src="./MovementMastering.png" alt="Movement Mastering Logo" />
        <h1>Movement Mastering</h1>
          <HeaderLinkContainer>
            <HeaderLink>
              <StyledLink to="/">Home</StyledLink>
            </HeaderLink>
            <HeaderLink>
            <StyledLink to="/faq">FAQ</StyledLink>
            </HeaderLink>
          </HeaderLinkContainer>
      
          <HamburgerToggle>
            <div onClick={() => setToggle(!toggle)}>{ toggle ? close : open }</div>
            {toggle && (
              <>
                <HeaderLink>
                  <NavLink to="/faq">FAQ</NavLink>
                </HeaderLink>
                <HeaderLink>
                  <NavLink to="/">Home</NavLink>
                </HeaderLink>
              </>
            )}
          </HamburgerToggle>
      </Header1>
    </div>
  );
}

export default Header;