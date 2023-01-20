import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import { BsInstagram } from "react-icons/bs"
import { AiOutlineInstagram, AiFillTwitterCircle } from "react-icons/ai"

const ContactWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
`

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  @media (max-width: 699px) {
    font-size: 1rem;
  }
`

const ContactLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledAnchor = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  @media (max-width: 699px) {
    font-size: 1rem;
  }
`

const Contact = () => {
  return(
    <ContactWrapper>
      <ContactInfo>
        <h2>Follow Us</h2>
        <h2>Work With Us</h2>
      </ContactInfo>
      <ContactLinks>
        <div>
          <a href="https://www.instagram.com/" target="_blank"><AiOutlineInstagram color="black" size={33} style={{ marginRight: 30 }}/></a>
          <a href="https://www.twitter.com/" target="_blank"><AiFillTwitterCircle color="black" size={33}/></a>
        </div>
        <StyledAnchor href="mailto:movementmastering@gmail.com">movementmastering@gmail.com</StyledAnchor>
      </ContactLinks>
    </ContactWrapper>
  );
}

export default Contact;

// Work with us then email nav
// Follow us and reacticon social links