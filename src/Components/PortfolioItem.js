import React from "react";
import PropTypes from "prop-types";
import './PortfolioItem.css';
import styled, { css } from "styled-components";

const AlbumImage = styled.img`
  cursor: pointer;
  width: 100%;
  &:hover {
    opacity: .5;
  }
`

const ImgContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;
width: 30%;
margin: 10px;
background-color: black;
@media (max-width: 899px){
  width 45%;
}
@media (max-width: 699px) {
  width: 95%;
  margin-bottom: -10px;
  justify-content: center;
}
`

const AlbumInfo = styled.div`
  display: none;
  pointer-events: none;
  ${ImgContainer}:hover & {
  display: block;
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-shadow: .5px .5px black;
}
`

const PortfolioItem = (props) => {
  return (
  <>
    <ImgContainer>
      <AlbumImage onClick = {() => props.whenPortfolioItemClicked(props.id)} src={props.albumCover} />
      <AlbumInfo>{props.artistName} {props.albumName}</AlbumInfo>
    </ImgContainer>
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