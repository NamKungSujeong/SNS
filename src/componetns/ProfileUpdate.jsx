import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { updateProfile } from "firebase/auth";
import userInitPhoto from "../asset/user.png";
import * as S from "./ProfileUpdate.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ProfileUpdate = ({ userObj, sweets, closeEditClick }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhoto, setNewPhoto] = useState(userObj.photoURL);

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
    closeEditClick();
  };

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.CloseBtn onClick={closeEditClick}>X</S.CloseBtn>
        <S.UpdateProfileForm onSubmit={onSubmit}>
          <S.FileLabel htmlFor="file">
            {newPhoto ? (
              <>
                <img src={newPhoto} alt="profile" />
                <div>
                  <FontAwesomeIcon icon={faImage} />
                </div>
              </>
            ) : (
              <>
                <img src={userInitPhoto} alt="profile" />
                <div>
                  <FontAwesomeIcon icon={faImage} size="2xl" />
                </div>
              </>
            )}
          </S.FileLabel>
          <input
            type="file"
            id="file"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          <S.DisplayNameInput
            type="text"
            placeholder="Display Name"
            onChange={onChange}
            value={newDisplayName}
          />
          <S.UpdateBtn type="submit">Update</S.UpdateBtn>
        </S.UpdateProfileForm>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default ProfileUpdate;
