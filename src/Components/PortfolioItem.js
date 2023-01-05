import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AlbumImage = styled.img`
  cursor: pointer;
  vertical-align: middle;
  width: 30%;
  margin: 10px;
  @media (max-width: 899px){
    width 45%;
  }
  @media (max-width: 699px) {
    display: flex;
    width: 100%;
    margin-bottom: -10px;
  }
`

const PortfolioItem = (props) => {
  return (
    <>
      <AlbumImage onClick = {() => props.whenPortfolioItemClicked(props.id)} src={props.albumCover} />
    </>
  )
}

PortfolioItem.propsTypes = {
  albumCover: PropTypes.string,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  spotify: PropTypes.string.isRequired,
  appleMusic: PropTypes.string.isRequired,
  id: PropTypes.string,
  whenPortfolioItemClicked: PropTypes.func
}

export default PortfolioItem;