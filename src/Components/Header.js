import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgClose } from 'react-icons/cg';

  const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
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
    margin: 1rem;
    cursor: pointer;
    &:hover {
      border-bottom: solid black .5px;
    }
  `;

  const StyledLink = styled(NavLink)`
    align-items: center;
    font-size: 1.2rem;
    color: black;
    display: flex;
    justify-content: center;

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
  cursor: pointer;
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

const Header = ({ handleScroll }) => {

  const [toggle, setToggle] = useState(false);

  const open = <HamburgerIcons><CgMenu size="40px" color="black" /></HamburgerIcons>
  const close = <HamburgerIcons><CgClose size="40px" color="black" /></HamburgerIcons>

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <HeaderContainer>
        <div onClick={refreshPage}>
          <MovementMasteringLogo src="./MovementMastering.png" alt="Movement Mastering Logo" />
        </div>
        <HeaderTitleAndLinksContainer>
          <Title></Title>
          <HeaderLinkContainer>
            <HeaderLink to="/">
              <StyledLink to="/">Home</StyledLink>
            </HeaderLink>
            <HeaderLink to="/faq">
              <StyledLink to="/faq">FAQ</StyledLink>
            </HeaderLink>
            <HeaderLink>
              <StyledLink onClick={handleScroll}>Contact</StyledLink>
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
                  <StyledLink onClick={handleScroll}>Contact</StyledLink>
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