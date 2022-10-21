import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

const NewPortfolioForm = (props) => {
  function handleNewPortfolioItemFormSubmission(e) {
    e.preventDefault();
    props.onNewPortfolioItemCreation({
      artistName: e.target.artistName.value,
      albumName: e.target.albumName.value,
      songName: e.target.songName.value,
      description: e.target.description.value
    })
  }
  return(
    <div>
      <ReusableForm 
        formSubmissionHandler={handleNewPortfolioItemFormSubmission}
        buttonText={"Submit"}
      />
    </div>
  );
}

NewPortfolioForm.propTypes = {
  onNewPortfolioItemCreation: PropTypes.func
};

export default NewPortfolioForm;