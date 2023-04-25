import React, { useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "fbase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faImage,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as S from "./write.styled";

const Write = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
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

  const onChange = (e) => {
    setSweet(e.target.value);
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
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => setAttachment(null);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <S.WriteContainer>
      <S.BackBtn>
        <FontAwesomeIcon icon={faCircleLeft} onClick={onBackClick} size="xl" />
      </S.BackBtn>
      <S.SweetForm onSubmit={onSubmit}>
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
        <S.Textarea
          type="text"
          value={sweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        {attachment && (
          <div>
            <S.ClearBtn onClick={onClearAttachmentClick}>
              <FontAwesomeIcon icon={faCircleXmark} size="xl" />
            </S.ClearBtn>
            <img
              src={attachment}
              alt="attachment"
              width="100%"
              height="200px"
            />
          </div>
        )}
        <S.SubmitBtn type="submit">send</S.SubmitBtn>
      </S.SweetForm>
    </S.WriteContainer>
  );
};
export default Write;
