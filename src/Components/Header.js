import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgClose } from 'react-icons/cg';

  const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
  `;

  const HeaderTitleAndLinksContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const Title = styled.h1`
    margin-left: 1em;
    @media (max-width: 700px) {
      display: none
    }
  `

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
    text-decoration: none;
    margin: 1em;
    cursor: pointer;
    &:hover {
    text-decoration: underline;
    }
    overflow: hidden;
    transition: 1s;
    left: 0;
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
    align-items: center;
    justify_content: center;
    flex-direction: row-reverse;
    justify-content: space-between;
    @media (min-width: 699px) {
      display: none;
    }
    position: absolute;
    z-index: 1;
    right: 0;
    overflow: hidden;
  `

  const MovementMasteringLogo = styled.img`
    width: 150px;
    @media (max-width: 699px) {
      width: 100px;
    }
  `
  const HamburgerIcons = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `

  const SlideLink = styled(NavLink)`
    slide-left {
      animation: 3s slide-left;
    }
    @keyframes slide-left {
      from {
        margin-left: 100%;
      }
      to {
        margin-left: 0%;
      }
    }
  `

const Header = () => {

  const [toggle, setToggle] = useState(false);

  const open = <HamburgerIcons><CgMenu size="40px" color="black" /></HamburgerIcons>
  const close = <HamburgerIcons><CgClose size="40px" color="black" /></HamburgerIcons>

  return (
    <div>
      <HeaderContainer>
        <NavLink to="/">
          <MovementMasteringLogo src="./MovementMastering.png" alt="Movement Mastering Logo" />
        </NavLink>
        <HeaderTitleAndLinksContainer>
          <Title>Movement Mastering</Title>
          <HeaderLinkContainer>
            <HeaderLink>
              <StyledLink to="/">Home</StyledLink>
            </HeaderLink>
            <HeaderLink>
            <StyledLink to="/faq">FAQ</StyledLink>
            </HeaderLink>
          </HeaderLinkContainer>
        </HeaderTitleAndLinksContainer>
          <HamburgerToggle>
            <div onClick={() => setToggle(!toggle)}>{ toggle ? close : open }</div>
            {toggle && (
              <>
                <HeaderLink>
                  <StyledLink to="/faq">FAQ</StyledLink>
                </HeaderLink>
                <HeaderLink>
                  <StyledLink to="/">Home</StyledLink>
                </HeaderLink>
              </>
            )}
          </HamburgerToggle>
      </HeaderContainer>
    </div>
  );
}

export default Header;