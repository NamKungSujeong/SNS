import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import PropTypes from "prop-types";
import userInitPhoto from "../asset/user.png";
import styled from "styled-components";

register("ko", koLocale);

const Sweet = ({ sweetObj, isOwner }) => {
  const sweetRef = doc(dbService, "sweets", `${sweetObj.id}`);
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (ok) {
      await deleteDoc(sweetRef);

      if (sweetObj.attachmentURL !== "") {
        await deleteObject(ref(storageService, sweetObj.attachmentURL));
      }
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(sweetRef, {
      text: newSweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    setNewSweet(e.target.value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newSweet}
              placeholder="Edit"
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          {sweetObj.attachmentURL && (
            <img
              src={sweetObj.attachmentURL}
              alt="file"
              width="50px"
              height="50px"
            />
          )}
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <SweetBlock>
          <SweetInfo>
            {sweetObj.profilePhoto ? (
              <img
                src={sweetObj.profilePhoto}
                alt="profile"
                style={{ width: "20px" }}
              />
            ) : (
              <img
                src={userInitPhoto}
                alt="profile"
                style={{ width: "20px" }}
              />
            )}
            <DisplayNameSpan>{sweetObj.displayName}</DisplayNameSpan>
            <CreatedAtSpan> {format(sweetObj.createdAt, "ko")}</CreatedAtSpan>
          </SweetInfo>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmentURL && (
            <img
              src={sweetObj.attachmentURL}
              alt="file"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </SweetBlock>
      )}
    </div>
  );
};

export default Sweet;

Sweet.propTypes = {
  sweetObj: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    attachmentURL: PropTypes.string,
    displayName: PropTypes.string,
    createdAt: PropTypes.number,
  }),
  isOwner: PropTypes.bool,
};

const SweetBlock = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  margin: 5px 0;
`;

const DisplayNameSpan = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const CreatedAtSpan = styled.span`
  color: #aaa;
  margin-left: 10px;
`;

const SweetInfo = styled.div`
  margin-bottom: 10px;
`;
