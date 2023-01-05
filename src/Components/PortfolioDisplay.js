import React from "react";
import PropTypes from "prop-types";
import PortfolioItem from "./PortfolioItem";
import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 699px) {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-content: center;
  width: 100%;
  gap: 10px;
}
`

const PortfolioDisplay = (props) => {
  return(
    <>
    <Grid>
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
    </Grid>
    </>
  );
}

PortfolioDisplay.propTypes = {
  portfolioDisplay: PropTypes.array,
  onPortfolioItemSelection: PropTypes.func
}

export default PortfolioDisplay;