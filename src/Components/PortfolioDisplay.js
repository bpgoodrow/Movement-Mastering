import React from "react";
import PropTypes from "prop-types";
import PortfolioItem from "./PortfolioItem";

const PortfolioDisplay = (props) => {
  return(
    <div>
      {Object.values(props.PortfolioDisplay).map((portfolioItem) =>
      <PortfolioItem
        whenPortfolioItemClicked = {props.onPortfolioItemSelection }
        artistName= { portfolioItem.artistName }
        albumName={ portfolioItem.albumName }
        songName={ portfolioItem.songName }
        description= { portfolioItem.description }
        id= { portfolioItem.id }
        key= { portfolioItem.id }
        />
      )}
    </div>
  );
}

PortfolioDisplay.propTypes = {
  PortfolioDisplay: PropTypes.array,
  onPortfolioItemSelection: PropTypes.func
}

export default PortfolioDisplay;