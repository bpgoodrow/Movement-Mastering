import React, {useEffect, useState} from "react";

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
        <div className="inputBox">
          <h3>Add New</h3>
          <h6>Description</h6>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button onClick={() => addLabelRate()}>Submit</button>
        </div>
        <hr />
        {loading ? <h1>Loading...</h1> : null}
        {labelRate.map((labelRate) => (
          <div className="labelRate" key={labelRate.id}>
            <p>{labelRate.desc}</p>
            <div>
              <button onClick={() => deleteLabelRate(labelRate)}>X</button>
              <button onClick={() => editLabelRate(labelRate)}>Edit Score</button>
            </div>
          </div>
        ))}
      </>
    )
  }
}

export default LabelRate;