import React, { useState } from "react";
import PropTypes from "prop-types";

const ReusableForm = (props) => {
  const [isfile, setFile] = useState(null);
  const handleImageAsFile = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <div>
      <form onSubmit={props.formSubmissionHandler}>
        <input 
          type="file"
          accept=".png, .jpg, .jpeg"
          name="albumCover"
          placeholder="album cover"
          onChange={handleImageAsFile}
          />
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
        <input
          type="text"
          name="spotify"
          placeholder="spotify"
        />
        <input
          type="text"
          name="appleMusic"
          placeholder="appleMusic"
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