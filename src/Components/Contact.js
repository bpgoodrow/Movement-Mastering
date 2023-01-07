import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from "styled-components";

const ContactForm = styled.form`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;

`

const StyledInput = styled.input`
  border: solid light-gray 2px;
  height: 1.5rem;
  padding: .5rem;
  width: 50vw;
  margin-bottom: 1em;
  
  &:focus {
    outline: none;
    border: 2px solid black;
  }
  @media (max-width: 700px) {
    width: 80vw;
  }
`

const StyledTextArea = styled.textarea`
  border: solid light-gray 2px;
  &:focus {
    outline: none;
    border: 2px solid black;
  }
  height: 2.5rem;
  padding: .5rem;
  outline: none;
  width: 50vw;
  @media (max-width: 700px) {
    width: 80vw;
  }
`

const StyledButton = styled.button`
  border: solid black 1px;
  background-color: black;
  color: white;
  cursor: pointer;
  height: 2rem;
    &:hover {
      background-color: #282828;
      border: 3px solid #282828;
    }
    &:active {
      background-color: #484848;
      border: 3px solid #484848;
    }
  margin-top: 1em;
  width: 6rem;
`

const ContactInfo = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  font-size: 1.5rem;
  justify-content: space-between;
  @media (max-width: 699px) {
    flex-direction: column;
  }
`

const ContactRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`

const Contact = () => {

  const [replyText, setReplyText] = useState('');
  const form = useRef();
  const captchaRef = useRef(null)

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_gf7t3i6', 'template_za24svi', form.current, 'tPq88Q7x8tb9yuPwd')
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
          setReplyText('Message Sent!')
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset();
  };

  return(
    <>
      <ContactInfo>
        <div>
          <h2>Movement Mastering</h2>
          <div>Based in Portland, operating globally</div>
        </div>
        <ContactRight>
          <h2>Contact</h2>
          <div>Interested in working together? Drop us a line!</div>
        </ContactRight>
      </ContactInfo>
      <ContactForm ref={form} onSubmit={sendEmail}>
        <div >
          {replyText}
        </div>
        <div>
          <StyledInput type="text" name="user_name" placeholder='Name'/>
        </div>
        <div>
          <StyledInput type="email" name="user_email" placeholder='Email Address'/>
        </div>
        <div>
            <StyledTextArea name="message" placeholder='Message'/>
        </div>
        <div>
          <ReCAPTCHA 
          sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
          ref={captchaRef}
        />
        </div>
        <div>
          <div>
            <StyledButton><span>Submit </span></StyledButton>
          </div>
        </div>
      </ContactForm>
    </>
  );
}

export default Contact;