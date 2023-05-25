import React, { useContext, useEffect } from "react";
import "./Profile.css";
import { Navbar, ProfileHeader } from "../../Components/Index";
import { InscribleContext } from "../../Context/Context";
import { useNavigate } from "react-router";



const Profile = () => {

  const {getSignInState} = useContext(InscribleContext);

  const navigate = useNavigate();

  useEffect(()=>{
    const state = getSignInState();
    if (!state) {
      navigate('/');
    }
  },[])
  
  return (
    <>
      <Navbar />
      <div className="profile">
        <ProfileHeader />
      </div>
    </>
  );
};

export default Profile;
