import React from "react";
import {useState} from 'react';

const FaqQuestions = ({question = "", answer = ""}) =>{
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => {
    isToggled ? setIsToggled(false) : setIsToggled(true);
  }
  return(
    <>
      <button id="accordion-button-1" aria-expanded={isToggled} onClick={onToggle}>
        <span>{question}</span>
        <span aria-hidden="true"></span>
      </button>
      <div>
        <p>{answer}</p>
      </div>
    </>
  )

}

export default FaqQuestions;