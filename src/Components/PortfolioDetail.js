import React from "react";
import PropTypes from "prop-types";
import { auth } from './../firebase';
import styled from "styled-components";
import { FaApple, FaSpotify } from "react-icons/fa";

const AlbumImage = styled.img`
  width: 50%;
`

const DetailContainer = styled.div`
  display: flex;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkIcon = styled.a`
  cursor: pointer;
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
            {visibleButtons ? null : <button onClick={props.onClickingEdit }>Update Item</button>}
            {visibleButtons ? null : <button onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</button>}
            
            <button onClick={props.onClickingHome }>Back</button>
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
            <button onClick={props.onClickingEdit }>Update Item</button>
            <button onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</button>
            {visibleButtons ? null : <button onClick={props.onClickingHome }>Home</button>}
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