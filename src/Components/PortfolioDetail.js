import React from "react";
import PropTypes from "prop-types";

const PortfolioDetail = (props) => {
  const { portfolioItem, onClickingDelete } = props;

  return (
    <div>
      <h4>{props.artistName}</h4>
      <h4>{props.albumName}</h4>
      <h4>{props.songName}</h4>
      <h4>{props.description}</h4>
      <button onClick={ props.onClickingEdit }>Update Item</button>
      <button onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</button>
    </div>
  );
}

PortfolioDetail.propTypes = {
  portfolioItem: PropTypes.object,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default PortfolioDetail;