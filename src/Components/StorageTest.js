import React, { useState, useEffect } from 'react';
import { db, auth, storage } from './../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot, uploadTask, add  } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";

const StorageTest = () => {
  const [error, setError] = useState();
  const [imageList, setImageList] = useState([])
  const [userInfo, setuserInfo] = useState({artist:'',});
  const [isUsers, setUsers] = useState([]);
  const [isfile, setFile] = useState(null);
  
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "mastersPortfolio"),
      (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            artist: doc.data().artist,
            image: doc.data().images,
          });
        });
        setUsers(users);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleImageAsFile = (e) => {
    setFile(e.target.files[0]);
  }

  const addPortfolioItem = async(event) => {
    try {
      event.preventDefault();
      let file = isfile;

      var storagePath = 'uploads/' + file.name;

      const storageRef = ref(storage, 'uploads/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("upldtsk", uploadTask)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => { 
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          addDoc(collection(db, 'mastersPortfolio'), ({
            artist: userInfo.artist,
            image: downloadURL,
          }))
          setuserInfo({
            ...userInfo,
              artist:'',
          });
        });
      });
    } catch (error) { throw error;}  
  }

  const storage = getStorage();
  const listRef = ref(storage, "uploads/");

  useEffect(() => {
    listAll(listRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          console.log(url)
        })
      })
    });
  }, []);

  return (<>
    <div className="App">
      <div>

        <form onSubmit={addPortfolioItem}>
          <input type="text" id="artist"  name="artist" value={userInfo.artist} onChange={onChangeValue} placeholder="Artist" required />
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
          <button type="submit" className="btn__default btn__add" > Upload </button>  
        </form>
      </div>

      {imageList.map((url => {
        return <img src={url} />;
      }))}

      {isUsers.map((items,index) => (
        <div key={items.id} >
          <div className="wrapper__list">
            <p><b> Artist : </b> {items.artist}</p>
            <img src={items.url} alt=""/>
          </div>    
        </div>
      ))}
      
    </div>
  </>)
}
export default StorageTest