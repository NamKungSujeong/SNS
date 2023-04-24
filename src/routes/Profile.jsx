import React, { useEffect, useState } from "react";
import { dbService, storageService, authService } from "fbase";
import {
  collection,
  where,
  query,
  orderBy,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { updateProfile, signOut } from "firebase/auth";
import Sweet from "componetns/Sweet";
import userInitPhoto from "../asset/user.png";
import * as S from "./Profile.styled";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhoto, setNewPhoto] = useState(userObj.photoURL);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setNewPhoto(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let photoURL = userObj.photoURL;
    if (newPhoto !== userObj.photoURL) {
      const photoRef = ref(
        storageService,
        `${userObj.uid}/profile/${uuidv4()}`
      );
      const res = await uploadString(photoRef, newPhoto, "data_url");
      photoURL = await getDownloadURL(res.ref);
    }

    if (
      userObj.displayName !== newDisplayName ||
      userObj.photoURL !== newPhoto
    ) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
        photoURL,
      });
      sweets.forEach((item) => {
        const nameRef = doc(dbService, "sweets", `${item.id}`);
        updateDoc(nameRef, {
          displayName: newDisplayName,
          profilePhoto: photoURL,
        });
      });
      setNewPhoto(photoURL);
    }
  };

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
          <button>프로필 변경</button>
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
      {/* <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="file" onChange={onFileChange} />
        <button type="submit">Update Profile</button>
      </form> */}
      <S.SweetContainer>
        <span>My sweets</span>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </S.SweetContainer>
    </S.ProfileContainer>
  );
};

export default Profile;
