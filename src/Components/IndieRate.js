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
import { db, auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getStorage } from 'firebase/storage';
import { v4 } from 'uuid';

const IndieRate = () => {

  const [indieRate, setIndieRate] = useState([]);
  const [desc, setDesc] = useState('');
  const colletionRef = collection(db, 'indieRate');
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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
        id: v4(),
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

  const imagesListRef = ref(storage, "indieRate/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `indieRate/indieCard`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  if (auth.currentUser == null) {
    return (
      <>
      {indieRate.map((indieRate) => (
        <div className="indieRate" key={indieRate.id}>
          <p>{indieRate.desc}</p>
        </div>
      ))}
      <RateCardImg>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}
    </RateCardImg>
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
      <div key={indieRate.id}>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <StyledButton onClick={uploadFile}>Upload</StyledButton>
      {imageUrls.map((url) => {
        return (
          <>
          <RateCardImg>
            <img src={url} />
          </RateCardImg>
          </>
        );
      })}
    </div>
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

const RateCardImg = styled.div`
display: flex;
justify-content: center;
width: 100%
`

export default IndieRate;