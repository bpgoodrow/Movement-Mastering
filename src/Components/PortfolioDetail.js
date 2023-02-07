import React from "react";
import PropTypes from "prop-types";
import { auth } from './../firebase';
import styled from "styled-components";
import { FaApple, FaSpotify } from "react-icons/fa";
import { SiTidal } from "react-icons/si"

const AlbumImage = styled.img`
  max-width: 50%;
  object-fit: cover;
  height: auto;
  @media (max-width: 999px) {
    max-width: 100%;
  }
`

const DetailContainer = styled.div`
  display: flex;
  @media (max-width: 999px) {
    flex-direction: column;
  }
`

const InfoContainer = styled.div`
  display: flex;
  font-size: 2em;
  margin-left: 10%;
  flex-direction: column;
  @media (max-width: 999px) {
    margin-left: 0px;
  }
  @media (max-width: 699px) {
    font-size: 1.5em;
  }
`

const InfoItem = styled.div`
  margin-bottom: 5px;
`

const LinkIcon = styled.a`
  cursor: pointer;
  width: 12%;
  margin-right: 5px;
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

const ArtistName = styled.div`
  
`

const PortfolioDetail = (props) => {
  const { portfolioItem, onClickingDelete } = props;

  if (auth.currentUser == null) {
    let visibleButtons = !null;
    console.log(auth.currentUser, "auth", visibleButtons);
    console.log(portfolioItem)
    if (portfolioItem.artistName ==  undefined) {
      let AlbumImage = null;
    }
    return (
      <>
        <DetailContainer>
          <AlbumImage src={portfolioItem.albumCover} />
          <InfoContainer>
            <ArtistName>
            {portfolioItem.artistName}
            |
            {portfolioItem.albumName}
            </ArtistName>
            <div>Song {portfolioItem.songName}</div>
            <div>Mastered By {portfolioItem.masteredBy}</div>
            <div>Produced By {portfolioItem.producedBy}</div>
            <div>Mixed By {portfolioItem.mixedBy}</div>
            <div>
              <LinkIcon href={portfolioItem.spotify} target="_blank"><FaSpotify color="black" size={35}/></LinkIcon>
              <LinkIcon href={portfolioItem.appleMusic} target="_blank"><FaApple color="black" size={39}/></LinkIcon>
              <LinkIcon href={portfolioItem.appleMusic} target="_blank"><SiTidal color="black" size={35}/></LinkIcon>
            </div>
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
            <InfoItem>Artist {portfolioItem.artistName}</InfoItem>
            <InfoItem>Album {portfolioItem.albumName}</InfoItem>
            <InfoItem>Song {portfolioItem.songName}</InfoItem>
            <InfoItem>Mastered By {portfolioItem.masteredBy}</InfoItem>
            <InfoItem>Produced By {portfolioItem.producedBy}</InfoItem>
            <InfoItem>Mixed By {portfolioItem.mixedBy}</InfoItem>
            <div>
              <LinkIcon href={portfolioItem.spotify} target="_blank"><FaSpotify color="black" size={35}/></LinkIcon>
              <LinkIcon href={portfolioItem.appleMusic} target="_blank"><FaApple color="black" size={39}/></LinkIcon>
              <LinkIcon href={portfolioItem.appleMusic} target="_blank"><SiTidal color="black" size={35}/></LinkIcon>
            </div>
            <StyledButton onClick={props.onClickingEdit }>Update Item</StyledButton>
            <StyledButton onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</StyledButton>
            <StyledButton onClick={props.onClickingHome }>Back</StyledButton>
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

// Artist and album title
// song title
// mastered by 
// produced by
// mixed by
// if field blank render null
// spotify and apple logo 20% larger