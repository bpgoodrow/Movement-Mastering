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
} from 'firebase/firestore';
import { db, auth } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
const LabelRate = () => {

  const [labelRate, setLabelRate] = useState([]);
  const [desc, setDesc] = useState('');
  const colletionRef = collection(db, 'labelRate');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLabelRate(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  async function addLabelRate() {

    const newLabelRate = {
      desc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const labelRateRef = doc(colletionRef, newLabelRate.id);
      await setDoc(labelRateRef, newLabelRate);
    } catch (error) {
      console.error(error);
    }
  }

   async function deleteLabelRate(labelRate) {
    try {
      const labelRateRef = doc(colletionRef, labelRate.id);
      await deleteDoc(labelRateRef, labelRateRef);
    } catch (error) {
      console.error(error);
    }
  }

  async function editLabelRate(labelRate) {
    const updatedlabelRate = {
      lastUpdate: serverTimestamp(),
    };

    try {
      const labelRateRef = doc(colletionRef, labelRate.id);
      updateDoc(labelRateRef, updatedlabelRate);
    } catch (error) {
      console.error(error);
    }
  }

  if (auth.currentUser == null){
    return (
      <>
      {loading ? <h1>Loading...</h1> : null}
        {labelRate.map((labelRate) => (
          <div className="labelRate" key={labelRate.id}>
            <p>{labelRate.desc}</p>
          </div>
        ))}
      </>
    )
  }
  if(auth.currentUser != null){

 
  return(
      <>
        <h1>LabelRates</h1>
        <div>
          <h3>Add New</h3>
          <StyledTextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
          <StyledButton onClick={() => addLabelRate()}>Submit</StyledButton>
        </div>
        <hr />
        {loading ? <h1>Loading...</h1> : null}
        {labelRate.map((labelRate) => (
          <div className="labelRate" key={labelRate.id}>
            <p>{labelRate.desc}</p>
            <div>
              <StyledButton onClick={() => deleteLabelRate(labelRate)}>Delete</StyledButton>
            </div>
          </div>
        ))}
      </>
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

export default LabelRate;