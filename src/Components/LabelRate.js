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
import { db, auth, storage } from './../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from 'uuid';
const LabelRate = () => {

  const [labelRate, setLabelRate] = useState([]);
  const [desc, setDesc] = useState('');
  const colletionRef = collection(db, 'labelRate');
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);

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
      id: v4(),
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

  const imagesListRef = ref(storage, "labelRate/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `labelindieRate/${imageUpload.name + v4()}`);
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

  if (auth.currentUser == null){
    return (
      <>
      {loading ? <h1>Loading...</h1> : null}
        {labelRate.map((labelRate) => (
          <div>
            <p>{labelRate.desc}</p>
          </div>
        ))}
        {imageUrls.map((url) => {
        return <img src={url} />;
      })}
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
        <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
        <button onClick={uploadFile}> Upload Image</button>
        {imageUrls.map((url) => {
        return <img src={url} />;
      })}
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