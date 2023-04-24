import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService } from "fbase";
import * as S from "./Navigation.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  const navigate = useNavigate();

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
        <li>
          <button onClick={onLogoutClick}>
            <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
          </button>
        </li>
      </S.Ul>
    </S.Nav>
  );
};

export default Navigation;
