import React from "react";
import PropTypes from "prop-types";
import PortfolioItem from "./PortfolioItem";

const PortfolioDisplay = (props) => {
  return(
    <>
      {[...Object.values(props.portfolioDisplay)].reverse().map((portfolioItem) =>
      <PortfolioItem
        whenPortfolioItemClicked = { props.onPortfolioItemSelection }
        albumCover= { portfolioItem.albumCover }
        artistName= { portfolioItem.artistName }
        albumName={ portfolioItem.albumName }
        songName={ portfolioItem.songName }
        description= { portfolioItem.description }
        spotify= { portfolioItem.spotify }
        appleMusic= { portfolioItem.appleMusic}
        id= { portfolioItem.id }
        key= { portfolioItem.id }
        />
      )}
    </>
  );
}

PortfolioDisplay.propTypes = {
  portfolioDisplay: PropTypes.array,
  onPortfolioItemSelection: PropTypes.func
}

export default PortfolioDisplay;