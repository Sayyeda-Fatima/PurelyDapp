import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import { Navbar, MyProfileHeader } from "../../Components/Index";
import { InscribleContext } from "../../Context/Context";
import { useNavigate } from "react-router";

const MyProfile = () => {

  const navigate = useNavigate();
  const {getSignInState} = useContext(InscribleContext);

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
        <MyProfileHeader />
      </div>
    </>
  );
};

export default MyProfile;