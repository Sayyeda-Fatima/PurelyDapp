import React from "react";
import { useNavigate } from "react-router-dom";
import './SearchCard.css';

const SearchCard = ({
  username,
  address,
  file,
  caption,
  imageText,
  likeCount,
  query,
  filteruser,
  filterUserAdress,
}) => {
  const navigate = useNavigate();
  console.log({username});
  const handleClick = () => {
    navigate(`/profile/${address}/${username}/`);
    console.log({username});
  };

  return (
    <div className="search-card">
      <div className="search-card-header" onClick={handleClick}>
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
        <div className="search-card-info">
          <h5>{username}</h5>
          <small>{address}</small>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
