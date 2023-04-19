import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogoutClick}>log out</button>
    </>
  );
};

export default Profile;
