import React, { useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "fbase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SweetFactory = ({ userObj }) => {
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

  return (
    <WriteContainer>
      <form onSubmit={onSubmit}>
        <textarea
          type="text"
          value={sweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
          style={{ width: "320px", height: "300px", border: "none" }}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="send" />
        {attachment && (
          <div>
            <img src={attachment} alt="attachment" width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
    </WriteContainer>
  );
};
export default SweetFactory;

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin: auto;
  margin-top: 100px;
  height: 490px;
`;
