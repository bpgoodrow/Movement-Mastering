import React, {useEffect, useState} from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, auth } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowDown, IoMdFastforward } from 'react-icons/io';

const FaqQuestions = (props) => {

  const [isToggled, setIsToggled] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [desc, setDesc] = useState();
  const [toggle, setToggle] = useState(false);
  const [header, setHeader] = useState();
  const colletionRef = collection(db, 'faqs');
  const [loading, setLoading] = useState();

  useEffect(() => {
    // const q = query(
    //   colletionRef,
      //  where('owner', '==', currentUserId),
      // where('desc', '==', 'faqs1') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    // );

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

    // eslint-disable-next-line
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

  // EDIT FUNCTION
  async function editFaqs(faqs) {
    console.log(editFaqs, "edit working")
    const updatedFaqs = {
      lastUpdate: serverTimestamp(),
    };

    try {
      const faqsRef = doc(colletionRef, faqs.id);
      updateDoc(faqsRef, updatedFaqs);
    } catch (error) {
      console.error(error);
    }
  }

  const open = <IoIosArrowForward size="30px" color="black" />
  const close = <IoIosArrowDown size="30px" color="black" />

  const onToggle = () => {
      isToggled ? setIsToggled(false) : setIsToggled(true);
  }
  return(
    <div className="faqs" key={faqs.id}>
        {console.log(faqs.id)}
        <FaqItem onClick={() => onToggle()}>{ toggle ? close : open }&nbsp;<h3>{props.header}</h3></FaqItem>
        {toggle && (
          <p>{props.desc}</p>
        )}
        
        <div>
          <StyledButton onClick={() => deleteFaqs(faqs)}>Delete</StyledButton>
        </div>
      <hr/>
    </div>
  )
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
  display: flex;
  width: 2000px;
  border: solid black .5px;
`

const FaqItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export default FaqQuestions;