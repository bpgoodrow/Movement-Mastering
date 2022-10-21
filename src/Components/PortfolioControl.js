import React, { useState, useEffect } from "react";
import About from "./About";
import PortfolioDisplay from "./PortfolioDisplay";
import PortfolioDetail from "./PortfolioDetail";
import NewPortfolioForm from "./NewPortfolioForm";
import EditPortfolioItemForm from "./EditPortfolioItemForm";

import { db, auth } from './../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const PortfolioControl = () => {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [portfolioDisplay, setPortfolioDisplay] = useState([]);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState();

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
            id: doc.id
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

  if (auth.currentUser == null) {
    return (
      <div>
        <h2>Log in to Access</h2>
      </div>
    )
  } else if (auth.currentUser != null) {

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