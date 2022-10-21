import React from "react";
import PropTypes from "prop-types";

const ReusableForm = (props) => {
  return (
    <div>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type="text"
          name="artist name"
          placeholder="artist name"
          />
        <input
          type="text"
          name="album name"
          placeholder="album name"
        />
        <input
          type="text"
          name="song name"
          placeholder="song name"
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