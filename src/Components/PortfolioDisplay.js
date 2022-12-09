import React from "react";
import PropTypes from "prop-types";
import PortfolioItem from "./PortfolioItem";

const PortfolioDisplay = (props) => {
  return(
    <React.Fragment>
      {[...Object.values(props.portfolioDisplay)].reverse().map((portfolioItem) =>
      <PortfolioItem
        whenPortfolioItemClicked = { props.onPortfolioItemSelection }
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
    </React.Fragment>
  );
}

PortfolioDisplay.propTypes = {
  portfolioDisplay: PropTypes.array,
  onPortfolioItemSelection: PropTypes.func
}

export default PortfolioDisplay;