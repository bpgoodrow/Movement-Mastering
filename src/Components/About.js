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
const About = () => {

  const [about, setAbout] = useState([]);
  const [desc, setDesc] = useState('');
  const collectionRef = collection(db, 'about');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const q = query(
      // collectionRef,
      //  where('owner', '==', currentUserId),
      // where('desc', '==', 'about1') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    // );

    setLoading(true);
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAbout(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addAbout() {

    const newAbout = {
      desc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const aboutRef = doc(collectionRef, newAbout.id);
      await setDoc(aboutRef, newAbout);
    } catch (error) {
      console.error(error);
    }
  }

   //DELETE FUNCTION
   async function deleteAbout(about) {
    try {
      const aboutRef = doc(collectionRef, about.id);
      await deleteDoc(aboutRef, aboutRef);
    } catch (error) {
      console.error(error);
    }
  }

  // EDIT FUNCTION
  async function editAbout(about) {
    console.log(editAbout, "edit working")
    const updatedAbout = {
      lastUpdate: serverTimestamp(),
    };

    try {
      const aboutRef = doc(collectionRef, about.id);
      updateDoc(aboutRef, updatedAbout);
    } catch (error) {
      console.error(error);
    }
  }
  
  if (auth.currentUser == null) {
    return (
      <>
      <h1>About</h1>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {about.map((about) => (
        <div key={about.id}>
          <p>{about.desc}</p>
        </div>
      ))}
    </>
    )
  } else {
    return(
      <>
        <h1>About</h1>
        <div className="inputBox">
          <h3>Add New</h3>
          <h6>Description</h6>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button onClick={() => addAbout()}>Submit</button>
        </div>
        <hr />
        {loading ? <h1>Loading...</h1> : null}
        {about.map((about) => (
          <div className="about" key={about.id}>
            <p>{about.desc}</p>
            <div>
              <button onClick={() => deleteAbout(about)}>Delete</button>
              <button onClick={() => editAbout(about)}>Edit</button>
            </div>
          </div>
        ))}
      </>
    )
  }
}

export default About;