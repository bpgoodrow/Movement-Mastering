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
    margin-bottom: 50px;
  `;

  const HomeLink = styled(NavLink)`
    text-decoration: none;
    margin: 1rem;
    cursor: pointer;
    border-bottom: ${(props) => (props.homeActive ? 'solid black .5px' : 'none')};
    &:hover {
      border-bottom: solid black .5px;
    }
    @media (max-width: 405px) {
      margin: .55rem;
    }
  `;

  const FaqLink = styled(NavLink)`
    text-decoration: none;
    margin: 1rem;
    cursor: pointer;
    border-bottom: 
      ${(props) => (props.faqActive ? 'solid black .5px' : 'none')};
    &:hover {
      border-bottom: solid black .5px;
    }
    @media (max-width: 405px) {
      margin: .55rem;
    }
  `;

  const ContactLink = styled(NavLink)`
    text-decoration: none;
    margin: 1rem;
    cursor: pointer;
    border-bottom: 
      ${(props) => (props.contactActive ? 'solid black .5px' : 'none')};
    &:hover {
      border-bottom: solid black .5px;
    }
    @media (max-width: 405px) {
      margin: .55rem;
    }
  `;

  const HeaderTitleAndLinksContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
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

  const HeaderLinkSelected = styled(NavLink)`
    border-bottom: solid black .5px
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    @media (max-width: 700px) {
      display: none
  `

  const StyledLink = styled(NavLink)`
    align-items: center;
    font-size: 1.2rem;
    color: black;
    display: flex;
    justify-content: center;
    text-decoration: none;
  `;

  const HamburgerToggle = styled.div`
    
    width: 100%;
    display: flex;
    align-items: center;
    justify_content: center;
    flex-direction: row-reverse;
    justify-content: end;
    position: absolute;
    z-index: 0;
    right: 0;
    overflow: hidden;
    @media (min-width: 699px) {
      display: none;
    }
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
  const [homeActive, setHomeActive] = useState(true);
  const [faqActive, setFaqActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);

  const open = <HamburgerIcons><CgMenu size="40px" color="black" /></HamburgerIcons>
  const close = <HamburgerIcons><CgClose size="40px" color="black" /></HamburgerIcons>

  const refreshPage = () => {
    window.location.reload(false);
  }

  if (homeActive == true) {
    
  }

  return (
      <HeaderContainer>
        <div onClick={refreshPage}>
          <MovementMasteringLogo src="./MovementMastering.png" alt="Movement Mastering Logo" />
        </div>
        <HeaderTitleAndLinksContainer>
          <HeaderLinkContainer>
            <HomeLink to="/" onClick={() => setHomeActive(!homeActive)} homeActive={homeActive}>
              <StyledLink to="/">Home</StyledLink>
            </HomeLink>
            <FaqLink to="/faq" onClick={() => setFaqActive(!faqActive)} faqActive={faqActive}>
              <StyledLink to="/faq">FAQ</StyledLink>
            </FaqLink>
            <ContactLink onClick={() => setContactActive(!contactActive)} contactActive={contactActive}>
              <StyledLink onClick={handleScroll}>Contact</StyledLink>
            </ContactLink>
          </HeaderLinkContainer>
        </HeaderTitleAndLinksContainer>
        <HamburgerToggle>
          <div onClick={() => setToggle(!toggle)}>{ toggle ? close : open }</div>
          {toggle && (
            <>
              <HomeLink onClick={() => setHomeActive(!homeActive)} homeActive={homeActive}>
                <StyledLink to="/faq">FAQ</StyledLink>
              </HomeLink>
              <FaqLink onClick={() => setFaqActive(!faqActive)} faqActive={faqActive}>
                <StyledLink onClick={handleScroll}>Contact</StyledLink>
              </FaqLink>
              <ContactLink onClick={() => setContactActive(!contactActive)} contactActive={contactActive}>
                <StyledLink to="/">Home</StyledLink>
              </ContactLink>
            </>
          )}
        </HamburgerToggle>
      </HeaderContainer>
  );
}

export default Header;