import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faImage,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "contexts/AuthProvider";

import { dbService, storageService } from "fbase";

import * as S from "./Write.styled";

const Write = () => {
  const [posts, setPosts] = useState("");
  const [attachment, setAttachment] = useState("");
  const navigate = useNavigate();
  const { userObj } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const res = await uploadString(attachmentRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(res.ref);
    }
    const postObj = {
      text: posts,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      displayName: userObj.displayName,
      profilePhoto: userObj.photoURL,
      attachmentURL,
    };
    try {
      await addDoc(collection(dbService, "posts"), postObj);
    } catch (err) {
      console.log("Error adding document", err);
    }
    setPosts("");
    setAttachment("");
    navigate("/");
  };

  const handlePostChange = (e) => {
    setPosts(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const theFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result);
    };
    reader.readAsDataURL(theFile);
  };

  const handleClearAttachmentClick = () => setAttachment("");

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <S.BackBtn>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={handleBackClick}
          size="xl"
        />
      </S.BackBtn>
      <S.PostForm onSubmit={handleSubmit}>
        <FileInput handleAttachmentChange={handleAttachmentChange} />
        <S.Textarea
          type="text"
          value={posts}
          onChange={handlePostChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        {attachment && (
          <Attachment
            attachment={attachment}
            handleClearAttachmentClick={handleClearAttachmentClick}
          />
        )}
        <S.SubmitBtn type="submit">send</S.SubmitBtn>
      </S.PostForm>
    </div>
  );
};
export default Write;

const FileInput = ({ handleAttachmentChange }) => {
  return (
    <>
      <label htmlFor="file">
        <FontAwesomeIcon icon={faImage} size="xl" />
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={handleAttachmentChange}
      />
    </>
  );
};

export const Attachment = ({ attachment, handleClearAttachmentClick }) => {
  return (
    <>
      {attachment && (
        <div>
          <S.ClearBtn onClick={handleClearAttachmentClick}>
            <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          </S.ClearBtn>
          <img src={attachment} alt="attachment" width="100%" height="200px" />
        </div>
      )}
    </>
  );
};
