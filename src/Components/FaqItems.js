import React, { useState, useEffect } from "react";

import { IoIosArrowForward, IoIosArrowDown, IoMdFastforward } from 'react-icons/io';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import styled from "styled-components";

const FaqItems = () => {

  const [toggle, setToggle] = useState(false);
  const colletionRef = collection(db, 'faqs');
  const [faqs, setFaqs] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState(
    Array(faqs.length).fill(false)
  );

  const onToggle = () => {
    toggle ? setToggle(false) : setToggle(true);
  }

  const open = <IoIosArrowForward size="30px" color="black" />
  const close = <IoIosArrowDown size="30px" color="black" />

  useEffect(() => {
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFaqs(items);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleClick = (index) => {
    setExpandedIndexes((prevExpandedIndexes) => {
      const newState = [...prevExpandedIndexes];
      newState.splice(index, 1, !prevExpandedIndexes[index]);
      return newState;
    });
  };
  
  const FaqItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
    const [rotateChevron, setRotateChevron] = useState(false);

    const handleRotate = () => setRotateChevron(!rotateChevron);

    const rotate = rotateChevron ? "rotate(90deg)" : "rotate(0)"

  return(
    <>
    {faqs.map(({header, desc}, index) => (
      <div>
        <div>
          <FaqItem onClick={() => (handleClick(index), onToggle())}>{ toggle ? close : open }&nbsp; <h3>{header}</h3></FaqItem>
          <IoIosArrowForward style={{ transform: rotate, transition: "all 0.2s linear" }} onClick={handleRotate} />
        </div>
        <p
          style={{ display: expandedIndexes[index] ? "block" : "none" }}
        >
          {desc}
        </p>
        <hr/>
      </div>
    ))}
    </>
  )

  

}

export default FaqItems;