import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PortfolioDisplay from "./PortfolioDisplay";
import NewPortfolioForm from "./NewPortfolioForm";
import Login from "./Login";

import { db, auth } from './../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot } from "firebase/firestore";

const PortfolioControl = () => {

  const [portofolio, setPortfolio] = useState([]);
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
        setPortfolio(mastersPortfolio);
      },
      (error) => {
      setError(error.message);
    }
    );
  }, []);

  return(
    <div>
      <h2>PortfolioControl</h2>
      <PortfolioDisplay />
      <NavLink to="/newportfolioForm">Portfolio Form</NavLink>
      <NavLink to ="/login">Login</NavLink>
    </div>
  )
}

export default PortfolioControl;