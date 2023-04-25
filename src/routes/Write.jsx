import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faImage,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { dbService, storageService } from "fbase";

import * as S from "./Write.styled";

const Write = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const res = await uploadString(attachmentRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(res.ref);
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      displayName: userObj.displayName,
      profilePhoto: userObj.photoURL,
      attachmentURL,
    };
    try {
      await addDoc(collection(dbService, "sweets"), sweetObj);
    } catch (err) {
      console.log("Error adding document", err);
    }
    setSweet("");
    setAttachment("");
    navigate("/");
  };

  const handleSweetChange = (e) => {
    setSweet(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const theFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result);
    };
    reader.readAsDataURL(theFile);
  };

  const handleClearAttachmentClick = () => setAttachment(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <S.WriteContainer>
      <S.BackBtn>
        <FontAwesomeIcon
          icon={faCircleLeft}
          onClick={handleBackClick}
          size="xl"
        />
      </S.BackBtn>
      <S.SweetForm onSubmit={handleSubmit}>
        <FileInput handleAttachmentChange={handleAttachmentChange} />
        <S.Textarea
          type="text"
          value={sweet}
          onChange={handleSweetChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <Attachment
          attachment={attachment}
          handleClearAttachmentClick={handleClearAttachmentClick}
        />
        <S.SubmitBtn type="submit">send</S.SubmitBtn>
      </S.SweetForm>
    </S.WriteContainer>
  );
};
export default Write;

const FileInput = ({ onFileChange }) => {
  return (
    <>
      <label htmlFor="file">
        <FontAwesomeIcon icon={faImage} size="xl" />
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

const Attachment = ({ attachment, onClearAttachmentClick }) => {
  return (
    <>
      {attachment && (
        <div>
          <S.ClearBtn onClick={onClearAttachmentClick}>
            <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          </S.ClearBtn>
          <img src={attachment} alt="attachment" width="100%" height="200px" />
        </div>
      )}
    </>
  );
};
