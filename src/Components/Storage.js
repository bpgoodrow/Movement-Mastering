import React, { useState, useEffect } from "react";
import { storage } from './../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";

const Storage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "album-covers/")
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `album-covers/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
      
    })
  }

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    });
  }, []);

  return (
    <>
      <input type= "file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>

      {imageList.map((url => {
        return <img src={url} />;
      }))}
    </>
  )
}

export default Storage;