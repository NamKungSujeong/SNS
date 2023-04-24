import React, { useNavigate } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService } from "fbase";
import * as S from "./Navigation.styled";

const Navigation = ({ userObj }) => {
  const navigate = useNavigate;

  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  return (
    <S.Nav>
      <S.Ul>
        <S.ProfileLi>
          <Link to="/profile">
            <img
              src={userObj.photoURL}
              alt="profile"
              style={{ width: "35px" }}
            />
          </Link>
        </S.ProfileLi>
        <S.HomeLi>
          <Link to="/">Home</Link>
        </S.HomeLi>
      </S.Ul>
      <button onClick={onLogoutClick}>log out</button>
    </S.Nav>
  );
};

export default Navigation;
