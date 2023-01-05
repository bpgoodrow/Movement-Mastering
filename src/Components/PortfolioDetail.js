import React from "react";
import PropTypes from "prop-types";
import { auth } from './../firebase';
import styled from "styled-components";
import { FaApple, FaSpotify } from "react-icons/fa";

const AlbumImage = styled.img`
  width: 50%;
  @media (max-width: 799px) {
    width: 100%;
  }
`

const DetailContainer = styled.div`
  display: flex;
  margin: 10px;
  @media (max-width: 799px) {
    flex-direction: column;
  }
`

const InfoContainer = styled.div`
  display: flex;
  margin-left: 50px;
  flex-direction: column;
  justify-content: space-around;
`

const LinkIcon = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
`

const StyledButton = styled.button`
  border: solid black 1px;
  background-color: black;
  color: white;
  cursor: pointer;
  height: 2rem;
    &:hover {
      background-color: #282828;
      border: 3px solid #282828;
    }
    &:active {
      background-color: #484848;
      border: 3px solid #484848;
    }
  margin-top: 1em;
  width: 6rem;
`

const PortfolioDetail = (props) => {
  const { portfolioItem, onClickingDelete } = props;

  if (auth.currentUser == null) {
    let visibleButtons = !null;
    console.log(auth.currentUser, "auth", visibleButtons)
    return (
      <>
        <DetailContainer>
          <AlbumImage src={portfolioItem.albumCover} />
          <InfoContainer>
            <h2>{portfolioItem.artistName} | {portfolioItem.albumName}</h2>
            <h4>Song {portfolioItem.songName}</h4>
            <h4>Notes {portfolioItem.description}</h4>
            <LinkIcon>
              <a href={portfolioItem.spotify} target="_blank"><FaSpotify size={30}/></a><a href={portfolioItem.appleMusic} target="_blank"><FaApple size={33}/></a>
            </LinkIcon>
            {visibleButtons ? null : <button onClick={props.onClickingEdit }>Update Item</button>}
            {visibleButtons ? null : <button onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</button>}
            
            <StyledButton onClick={props.onClickingHome }>Back</StyledButton>
            {/* {error ? null : <button onClick={handleClick}>{buttonText}</button>} */}
          </InfoContainer>
        </DetailContainer>
      </>
    ); 
  } else {
    let visibleButtons = !null;
    return (
      <>
        <DetailContainer>
          <AlbumImage src={portfolioItem.albumCover} />
          <InfoContainer>
            <h4>Artist: {portfolioItem.artistName}</h4>
            <h4>Album: {portfolioItem.albumName}</h4>
            <h4>Song: {portfolioItem.songName}</h4>
            <h4>Notes: {portfolioItem.description}</h4>
            <LinkIcon>
                <a href={portfolioItem.spotify} target="_blank"><FaSpotify/></a>
            </LinkIcon>
            <LinkIcon>
            <a href={portfolioItem.appleMusic} target="_blank"><FaApple/></a>
            </LinkIcon>
            <StyledButton onClick={props.onClickingEdit }>Update Item</StyledButton>
            <StyledButton onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</StyledButton>
            {visibleButtons ? null : <StyledButton onClick={props.onClickingHome }>Home</StyledButton>}
            {/* {error ? null : <button onClick={handleClick}>{buttonText}</button>} */}
          </InfoContainer>
        </DetailContainer>
      </>
    )
  }
}

PortfolioDetail.propTypes = {
  portfolioItem: PropTypes.object,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default PortfolioDetail;