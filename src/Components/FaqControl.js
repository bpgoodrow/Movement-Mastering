import React, { useEffect } from "react";
import FaqDisplay from "./FaqDisplay";
import FaqDetail from "./FaqDetail";
import FaqForm from "./FaqForm";
import { db, auth, storage } from './../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot } from "firebase/firestore";
import { v4 } from "uuid";
import styled from "styled-components";

const FaqControl = () => {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [faqDisplay, setFaqDisplay] = useState([]);
  const [selectedFaqItem, setSelectedFaqItem] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "faq"),
      (querySnapshot) => {
        const faq = [];
        querySnapshot.forEach((doc) => {
          faq.push({
            question: doc.data().question,
            answer: doc.data().answer,
            id: doc.id,
          });
        });
        setFaqDisplay(faq);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedFaqItem != null) {
      setFormVisibleOnPage(false);
      setSelectedFaqItem(null);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewFaqToFaqDisplay = async (newFaqItemData) => {
    await addDoc(collection(db, "faq"), newFaqItemData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedFaqItem = (id) => {
    const selection = faqDisplay.filter(FaqItem => FaqItem.id === id)[0];
    setSelectedFaqItem(selection);
  }

}
