import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
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
    <div>
    <h2>Contact</h2>
    <div className='contactHeroForm'>
              <form ref={form} onSubmit={sendEmail}>
                <div className='contactHeroFormReply'>
                    {replyText}
                </div>
                <div className='contactHeroFormName'>
                  <input type="text" name="user_name" placeholder='Name'/>
                </div>
                <div className='contactHeroFormEmail'>
                  <input type="email" name="user_email" placeholder='Email Address'/>
                </div>
                <div className='contactHeroFormMessage'>
                    <textarea name="message" placeholder='Message'/>
                </div>
                
                <div className='recaptcha'>
                  <ReCAPTCHA 
                  sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                  ref={captchaRef}
                />
                </div>
                <div className='contactHeroFormButtonReplyContainer'>
                  <div className='contactHeroFormButton'>
                    <button className="button"><span>Submit </span></button>
                  </div>
                </div>
              </form>
            </div>
    </div>
  );
}

export default Contact;