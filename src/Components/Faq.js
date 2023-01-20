import React, {useEffect, useState} from "react";
import FaqQuestions from "./FaqQuestions";
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

const Faqs = () => {

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
  
  const onToggle = () => {
    console.log(...faqs);
    toggle ? setToggle(false) : setToggle(true);
  }

  const open = <IoIosArrowForward size="30px" color="black" />
  const close = <IoIosArrowDown size="30px" color="black" />

  if (auth.currentUser == null) {
    return (
      <>
      {loading ? <h1>Loading...</h1> : null}
      {faqs.map((faqs) => (
        <>
        <div key={faqs.id}>
          <FaqItem onClick={() => onToggle()}>{ toggle ? close : open }&nbsp;<h3>{faqs.header}</h3></FaqItem>
          {toggle && (
            <p>{faqs.desc}</p>
          )}
          <hr/>
          </div>
        </>
      ))}
      </>
    )
  }
  
  // const TestItem = ({question = "", answer = ""}) => {
  //   const [isToggled, setIsToggled] = useState(false);

  //   const onToggle = () => {
  //       isToggled ? setIsToggled(false) : setIsToggled(true);
  //   }
  //   return(
  //     <div className="faqs" key={faqs.id}>
  //         {console.log(faqs.id)}
  //         <FaqItem onClick={() => onToggle()}>{ toggle ? close : open }&nbsp;<h3>{question}</h3></FaqItem>
  //         {toggle && (
  //           <p>{answer}</p>
  //         )}
          
  //         <div>
  //           <StyledButton onClick={() => deleteFaqs(faqs)}>Delete</StyledButton>
  //         </div>
  //       <hr/>
  //     </div>
  //   )
  // }

  // if (auth.currentUser == null) {
  //   return (
  //     <>
  //     {loading ? <h1>Loading...</h1> : null}
  //     {faqs.map((FaqQuestions) => (
  //       <>
  //       <FaqQuestions
  //         question={faqs.header}
  //         answer={faqs.desc}
  //         />
  //       </>
  //     ))}
  //     </>
  //   )
  // }


  return(
    <FaqWrapper>
      <h1>Faq</h1>
      <div className="inputBox">
        <h3>Add New FAQ</h3>
        <h6>FAQ</h6>
        <StyledTextArea value={header} onChange={(e) => setHeader(e.target.value)} />
        <h6>Answer</h6>
        <StyledTextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <StyledButton onClick={() => addFaqs()}>Submit</StyledButton>
      </div>
      {loading ? <h1>Loading...</h1> : null}
      {faqs.reverse().map((faqs) => (
        <div className="faqs" key={faqs.id}>
          {console.log(faqs.id)}
          <div onClick={onToggle}><h3>{faqs.header}</h3></div>
          {toggle && (
            <p>{faqs.desc}</p>
          )}
          
          <div>
            <StyledButton onClick={() => deleteFaqs(faqs)}>Delete</StyledButton>
          </div>
        <hr/>
        </div>
      ))}
    </FaqWrapper>
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
  flex-direction: column;
  width: 100%;
`

const FaqItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export default Faqs;