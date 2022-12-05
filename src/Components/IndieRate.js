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
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addIndieRate()}>Submit</button>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {indieRate.map((indieRate) => (
        <div className="indieRate" key={indieRate.id}>
          <p>{indieRate.desc}</p>
          <div>
            <button onClick={() => deleteIndieRate(indieRate)}>X</button>
            <button onClick={() => editIndieRate(indieRate)}>Edit</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default IndieRate;