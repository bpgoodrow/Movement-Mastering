import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  Query
} from 'firebase/firestore';
import { db, auth } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
const IndieRate = () => {

  const [indieRate, setIndieRate] = useState([]);
  const [desc, setDesc] = useState('');
  const colletionRef = collection(db, 'indieRate');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const q = query(
    //   colletionRef,
      //  where('owner', '==', currentUserId),
      // where('desc', '==', 'indieRate1') // does not need index
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
      setIndieRate(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

  async function addIndieRate() {

    const newIndieRate = {
      desc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const indieRateRef = doc(colletionRef, newIndieRate.id);
      await setDoc(indieRateRef, newIndieRate);
    } catch (error) {
      console.error(error);
    }
  }

   //DELETE FUNCTION
   async function deleteIndieRate(indieRate) {
    try {
      const indieRateRef = doc(colletionRef, indieRate.id);
      await deleteDoc(indieRateRef, indieRateRef);
    } catch (error) {
      console.error(error);
    }
  }

  // EDIT FUNCTION
  async function editIndieRate(indieRate) {
    console.log(editIndieRate, "edit working")
    const updatedindieRate = {
      lastUpdate: serverTimestamp(),
    };

    try {
      const indieRateRef = doc(colletionRef, indieRate.id);
      updateDoc(indieRateRef, updatedindieRate);
    } catch (error) {
      console.error(error);
    }
  }

  if (auth.currentUser == null) {
    return (
      <>
      {indieRate.map((indieRate) => (
        <div className="indieRate" key={indieRate.id}>
          <p>{indieRate.desc}</p>
        </div>
      ))}
      </>
    )
  }

  return(
    <>
      <h1>IndieRates</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <h6>Description</h6>
        <StyledTextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <StyledButton onClick={() => addIndieRate()}>Submit</StyledButton>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {indieRate.map((indieRate) => (
        <div className="indieRate" key={indieRate.id}>
          <p>{indieRate.desc}</p>
          <div>
            <StyledButton onClick={() => deleteIndieRate(indieRate)}>Delete</StyledButton>
          </div>
        </div>
      ))}
    </>
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

export default IndieRate;