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
import Sweet from "components/Sweet/Sweet";
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

const Profile = ({ userObj, creator }) => {
  const [sweets, setSweets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(dbService, "sweets"),
      where("creatorId", "==", creator.id),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArr);
    });
    // console.log(testId);
  }, [
    userObj.uid,
    userObj.displayName,
    userObj.photoURL,
    creator.id,
    creator.url,
    creator.displayName,
  ]);

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
      <UserProfile
        userObj={userObj}
        handleEditClick={handleEditClick}
        testId={creator}
        isOwner={creator.id === userObj.uid}
      />
      <span>{sweets.length} sweets</span>
      <S.SweetContainer>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
            // test3={test3}
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

const UserProfile = ({ handleEditClick, userObj, testId, isOwner }) => {
  const imgSrc = testId.url || userInitPhoto;
  return (
    <S.UserProfile>
      {isOwner && (
        <S.UpdateBtn>
          <button onClick={handleEditClick}>프로필 변경</button>
        </S.UpdateBtn>
      )}
      <S.ProfileImg src={imgSrc} alt="profile" />
      <S.UserDisplayName>{testId.displayName}</S.UserDisplayName>
    </S.UserProfile>
  );
};
