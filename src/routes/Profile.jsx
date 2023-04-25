import React, { useEffect, useState } from "react";
import { dbService, authService } from "fbase";
import {
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import Sweet from "components/Sweet";
import userInitPhoto from "../asset/user.png";
import * as S from "./Profile.styled";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import ProfileUpdate from "components/ProfileUpdate";
import WriteBtn from "components/WriteBtn";

const Profile = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(dbService, "sweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArr);
    });
  }, [userObj.uid, userObj.displayName, userObj.photoURL]);

  const handleLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <S.ProfileContainer>
      <Nav handleLogoutClick={handleLogoutClick} />
      <UserProfile userObj={userObj} handleEditClick={handleEditClick} />
      <S.SweetContainer>
        <span>{sweets.length} sweets</span>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </S.SweetContainer>
      {isEditing && (
        <ProfileUpdate
          userObj={userObj}
          sweets={sweets}
          handleEditClick={handleEditClick}
        />
      )}
      <WriteBtn />
    </S.ProfileContainer>
  );
};

export default Profile;

const Nav = ({ handleLogoutClick }) => {
  return (
    <S.Nav>
      <li>
        <Link to="/">
          <FontAwesomeIcon icon={faCircleLeft} size="xl" />
        </Link>
      </li>
      <li>
        <button onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
        </button>
      </li>
    </S.Nav>
  );
};

const UserProfile = ({ handleEditClick, userObj }) => {
  return (
    <S.UserProfile>
      <S.UpdateBtn>
        <button onClick={handleEditClick}>프로필 변경</button>
      </S.UpdateBtn>
      {userObj.photoURL ? (
        <S.ProfileImg
          src={userObj.photoURL}
          alt="profile"
          style={{ width: "80px" }}
        />
      ) : (
        <S.ProfileImg
          src={userInitPhoto}
          alt="profile"
          style={{ width: "80px" }}
        />
      )}
      <S.UserDisplayName>{userObj.displayName}</S.UserDisplayName>
    </S.UserProfile>
  );
};
