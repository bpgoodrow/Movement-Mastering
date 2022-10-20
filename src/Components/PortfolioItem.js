import React from "react";
import PropTypes from "prop-types";

const PortfolioItem = (props) => {
  return (
    <div>
      <div onClick = {() => props.whenPortfolioItemClicked(props.id)}>
        <h4>{props.artistName}</h4>
        <h4>{props.albumName}</h4>
        <h4>{props.songName}</h4>
        <h4>{props.description}</h4>
      </div>
    </div>
  )
}

PortfolioItem.propsTypes = {
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
  whenPortfolioItemClicked: PropTypes.func
}

export default PortfolioItem;