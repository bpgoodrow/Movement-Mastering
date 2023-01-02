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

  function handleToggle() {
    setToggle(!toggle)
  }

  if (auth.currentUser == null) {
    return (
      <>
      {faqs.reverse().map((faqs) => (
        <div className="faqs" key={faqs.id}>
          <p>{faqs.header}</p>
          <p>{faqs.desc}</p>
        </div>
      ))}
      </>
    )
  }

  return(
    <>
      <h1>Faq</h1>
      <div className="inputBox">
        <h3>Add New FAQ</h3>
        <h6>Header</h6>
        <textarea value={header} onChange={(e) => setHeader(e.target.value)} />
        <h6>Description</h6>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addFaqs()}>Submit</button>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {faqs.reverse().map((faqs) => (
        <div className="faqs" key={faqs.id}>
          {console.log(faqs.id)}
          <div onClick={() => handleToggle(faqs.id)}><h3>{faqs.header}</h3></div>
          {toggle && (
            <p>{faqs.desc}</p>
          )}
          
          <div>
            <button onClick={() => deleteFaqs(faqs)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Faqs;