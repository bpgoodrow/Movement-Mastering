import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

const NewPortfolioForm = (props) => {
  function handleNewPortfolioItemFormSubmission(event) {
    event.preventDefault();
    props.onNewPortfolioItemCreation({
      artistName: event.target.artistName.value,
      albumName: event.target.albumName.value,
      songName: event.target.songName.value,
      description: event.target.description.value
    })
  }
  return(
    <div>
      <ReusableForm 
        formSubmissionHandler={handleNewPortfolioItemFormSubmission}
      />
    </div>
  );
}

NewPortfolioForm.propTypes = {
  onNewPortfolioItemCreation: PropTypes.func
};

export default NewPortfolioForm;