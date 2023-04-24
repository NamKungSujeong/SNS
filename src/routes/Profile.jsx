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
import Sweet from "componetns/Sweet";
import userInitPhoto from "../asset/user.png";
import * as S from "./Profile.styled";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import ProfileUpdate from "componetns/ProfileUpdate";

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

  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  const onEditClick = () => {
    setIsEditing(true);
  };

  const closeEditClick = () => {
    setIsEditing(false);
  };

  return (
    <S.ProfileContainer>
      <S.Nav>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faCircleLeft} size="xl" />
          </Link>
        </li>
        <li>
          <button onClick={onLogoutClick}>
            <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
          </button>
        </li>
      </S.Nav>
      <S.UserProfile>
        <S.UpdateBtn>
          <button onClick={onEditClick}>프로필 변경</button>
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
          closeEditClick={closeEditClick}
        />
      )}
    </S.ProfileContainer>
  );
};

export default Profile;
