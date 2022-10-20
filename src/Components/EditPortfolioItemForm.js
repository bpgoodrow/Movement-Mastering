import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

const EditPortfolioItemForm = (props) => {
  const { portfolioItem } = props;

  function handleEditPortfolioItemFormSubmission(event) {
    event.preventDefault();
    props.onEditPortfolioItem({
      artistName: event.target.artistName.value,
      albumName: event.target.albumName.value,
      songName: event.target.songName.value,
      description: event.target.description.value,
      id: portfolioItem.id,
    });
  }
  return (
    <div>
      <ReusableForm
        formSubmissionHandler={handleEditPortfolioItemFormSubmission}
      />
    </div>
  )
}

EditPortfolioItemForm.propTypes = {
  portfolioItem: PropTypes.object,
  onEditPortfolioItem: PropTypes.func,
}

export default EditPortfolioItemForm;