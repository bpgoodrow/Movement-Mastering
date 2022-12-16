import React, { useState, useEffect } from "react";
import About from "./About";
import PortfolioDisplay from "./PortfolioDisplay";
import PortfolioDetail from "./PortfolioDetail";
import NewPortfolioForm from "./NewPortfolioForm";
import EditPortfolioItemForm from "./EditPortfolioItemForm";

import { db, auth, storage } from './../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import { stringLength } from "@firebase/util";

const PortfolioControl = () => {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [portfolioDisplay, setPortfolioDisplay] = useState([]);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "album-covers/")

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `album-covers/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
        addDoc(collection(db, 'mastersPortfolio'), ({
          albumCover: url
        }))
      })
    })
  }

  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       })
  //     })
  //   });
  // }, []);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "mastersPortfolio"),
      (querySnapshot) => {
        const mastersPortfolio = [];
        querySnapshot.forEach((doc) => {
          mastersPortfolio.push({
            artistName: doc.data().artistName,
            albumName: doc.data().albumName,
            songName: doc.data().songName,
            description: doc.data().description,
            spotify: doc.data().spotify,
            appleMusic: doc.data().appleMusic,
            albumCover: doc.data().albumCover,
            id: doc.id,
          });
        });
        setPortfolioDisplay(mastersPortfolio);
      },
      (error) => {
      setError(error.message);
    }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedPortfolioItem != null) {
      setFormVisibleOnPage(false);
      setSelectedPortfolioItem(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewPortfolioItemToPortfolioDisplay = async (newPortfolioItemData) => {
    await addDoc(collection(db, "mastersPortfolio"), newPortfolioItemData);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `album-covers/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
        addDoc(collection(db, 'mastersPortfolio'), ({
          albumCover: url
        }))
      })
    })
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedPortfolioItem = (id) => {
    const selection = portfolioDisplay.filter(PortfolioItem => PortfolioItem.id === id)[0];
    setSelectedPortfolioItem(selection);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingPortfolioItemInPortfolioDisplay = async (portfolioItemToEdit) => {
    await updateDoc(doc(db, "mastersPortfolio", portfolioItemToEdit.id), portfolioItemToEdit);
    setEditing(false);
    setSelectedPortfolioItem(null);
  }

  const handleDeletingPortfolioItem = async (id) => {
    await deleteDoc(doc(db, "mastersPortfolio", id));
    setSelectedPortfolioItem(null);
  }

  const handleHomeClick = () => {
    setSelectedPortfolioItem(null);
  }

  if (auth.currentUser == null) {
    let currentlyVisibleState = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (selectedPortfolioItem != null) {
      currentlyVisibleState = <PortfolioDetail 
      portfolioItem={selectedPortfolioItem}
      />
      if (error) {
        currentlyVisibleState = <p>There was an error: {error}</p>
      } else if (selectedPortfolioItem != null) {
        currentlyVisibleState = <PortfolioDetail 
        portfolioItem={selectedPortfolioItem}
        onClickingHome={handleHomeClick}
        />
      } else {
        currentlyVisibleState = <PortfolioDisplay onPortfolioItemSelection=
        {handleChangingSelectedPortfolioItem} portfolioDisplay={portfolioDisplay}
        />;
      }
    } else {
      currentlyVisibleState = <PortfolioDisplay onPortfolioItemSelection=
      {handleChangingSelectedPortfolioItem} portfolioDisplay={portfolioDisplay}
      />;
    }
    return (
      <div>
        <About />
        <>

          <input type= "file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
          <button onClick={uploadImage}>Upload Image</button>

      {/* {imageList.map((url => {
        return <img src={url} />;
      }))} */}
    </>
        {currentlyVisibleState}
      </div>
    )
  } else if (auth.currentUser !== null) {

    let currentlyVisibleState = null;
    let buttonText = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing) {
      currentlyVisibleState = <EditPortfolioItemForm portfolioItem={selectedPortfolioItem}
      onEditPortfolioItem = {handleEditingPortfolioItemInPortfolioDisplay}
      />
      buttonText = "Return to Portfolio Display";
    } else if (selectedPortfolioItem != null) {
      currentlyVisibleState = <PortfolioDetail 
      portfolioItem={selectedPortfolioItem}
      onClickingEdit= {handleEditClick}
      onClickingDelete = {handleDeletingPortfolioItem}
      />
      buttonText = "Return to Portfolio Display"
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewPortfolioForm onNewPortfolioItemCreation={handleAddingNewPortfolioItemToPortfolioDisplay}/>;
      buttonText = "Return to Portfolio Display"
    } else {
      currentlyVisibleState = <PortfolioDisplay onPortfolioItemSelection=
      {handleChangingSelectedPortfolioItem} portfolioDisplay={portfolioDisplay}
      />;
      buttonText = "Add Item"
    }
    return(
      <div>
        <About />
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </div>
    )
  }
}

export default PortfolioControl;