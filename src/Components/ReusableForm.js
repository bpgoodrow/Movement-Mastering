import React from "react";
import PropTypes from "prop-types";

const ReusableForm = (props) => {
  return (
    <div>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type="text"
          name="artistName"
          placeholder="artist name"
          />
        <input
          type="text"
          name="albumName"
          placeholder="album name"
        />
        <input
          type="text"
          name="songName"
          placeholder="songName"
        />
        <input
          type="text"
          name="description"
          placeholder="description"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;