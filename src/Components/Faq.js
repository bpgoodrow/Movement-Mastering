import React, {useEffect, useState, forwardRef, useRef, useImperativeHandle} from "react";
import FaqItems from "./FaqItems";
import ArrowToggle from "./ArrowToggle";
import {
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
import styled, { keyframes } from "styled-components";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

const Faqs = ({onClick}) => {

  const [faqs, setFaqs] = useState([]);
  const [desc, setDesc] = useState();
  const [header, setHeader] = useState();
  const [toggle, setToggle] = useState(false);
  const colletionRef = collection(db, 'faqs');
  const [loading, setLoading] = useState();
  const [expandedIndexes, setExpandedIndexes] = useState(
    Array(faqs.length).fill(false)
  );

  useEffect(() => {
    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFaqs(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  async function addFaqs() {

    const newFaqs = {
      header,
      desc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const faqsRef = doc(colletionRef, newFaqs.id);
      await setDoc(faqsRef, newFaqs);
    } catch (error) {
      console.error(error);
    }
  }

   //DELETE FUNCTION
   async function deleteFaqs(faqs) {
    try {
      const faqsRef = doc(colletionRef, faqs.id);
      await deleteDoc(faqsRef, faqsRef);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (index) => {
    setExpandedIndexes((prevExpandedIndexes) => {
      const newState = [...prevExpandedIndexes];
      newState.splice(index, 1, !prevExpandedIndexes[index]);
      // Call toggle arrow
      return newState;
    });
  };

  if (auth.currentUser == null) {
    return (
      <>
      <FaqWrapper>
          {loading ? <h1>Loading...</h1> : null}
          {faqs.map(({header, desc}, index) => (
            <div key={faqs.id} className="details-wrapper">
              <div>
                <FaqItem  onClick={() => (handleClick(index))}><ArrowToggle/><h3>{header}</h3></FaqItem>
              </div>
              <p
                className="text"
                // check for each child's state to display correctly
                style={{ transition: "all 0.1s linear", display: expandedIndexes[index] ? "block" : "none" }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {desc}
              </p>
              <hr/>
            </div>
          ))}
          {/* <FaqItems/> */}
        </FaqWrapper>
      </>
    )
  } else {
      return(
        <FaqWrapper>
          <div>
            <h3>Add New FAQ</h3>
            <h6>FAQ</h6>
            <StyledTextArea value={header} onChange={(e) => setHeader(e.target.value)} />
            <h6>Answer</h6>
            <StyledTextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
            <StyledButton onClick={() => addFaqs()}>Submit</StyledButton>
          </div>
          {loading ? <h1>Loading...</h1> : null}
          {faqs.map(({header, desc}, index) => (
            <div key={faqs.id} className="details-wrapper">
              <div>
                <FaqItem onClick={() => (handleClick(index))}><ArrowToggle/><h3>{header}</h3></FaqItem>
              </div>
              <p style={{ transition: "all 5s linear", display: expandedIndexes[index] ? "block" : "none" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc}
              </p>
              <hr/>
            </div>
          ))}
        </FaqWrapper>
      )
    }
}

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

const FaqWrapper = styled.div`
 
`

const FaqItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export default Faqs;