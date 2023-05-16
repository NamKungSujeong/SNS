import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { dbService, storageService } from "fbase";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./ProfileUpdate.styled";
import userInitPhoto from "../asset/user.png";
import Modal from "../common/Modal";

const ProfileUpdate = ({ userObj, sweets, handleEditClick }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhoto, setNewPhoto] = useState(userObj.photoURL);

  const handleDisplayNameChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const theFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPhoto(reader.result);
    };
    reader.readAsDataURL(theFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoURL = userObj.photoURL;
    if (newPhoto !== userObj.photoURL) {
      const photoRef = ref(
        storageService,
        `${userObj.uid}/profile/${uuidv4()}`
      );
      const result = await uploadString(photoRef, newPhoto, "data_url");
      photoURL = await getDownloadURL(result.ref);
    }

    if (
      userObj.displayName !== newDisplayName ||
      userObj.photoURL !== newPhoto
    ) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
        photoURL,
      });
      await Promise.all(
        sweets.map(async (item) => {
          const nameRef = doc(dbService, "sweets", `${item.id}`);
          await updateDoc(nameRef, {
            displayName: newDisplayName,
            profilePhoto: photoURL,
          });
        })
      );
      setNewPhoto(photoURL);
    }
    handleEditClick();
  };

  const imgSrc = newPhoto || userInitPhoto;

  return (
    <Modal>
      <S.CloseBtn onClick={handleEditClick}>X</S.CloseBtn>
      <S.UpdateProfileForm onSubmit={handleSubmit}>
        <S.FileLabel htmlFor="file">
          <img src={imgSrc} alt="profile" />
          <div>
            <FontAwesomeIcon icon={faImage} />
          </div>
        </S.FileLabel>
        <input type="file" id="file" onChange={handlePhotoChange} />
        <S.DisplayNameInput
          type="text"
          placeholder="Display Name"
          onChange={handleDisplayNameChange}
          value={newDisplayName}
        />
        <S.UpdateBtn type="submit">Update</S.UpdateBtn>
      </S.UpdateProfileForm>
    </Modal>
  );
};

export default ProfileUpdate;
