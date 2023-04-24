import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import PropTypes from "prop-types";
import userInitPhoto from "../asset/user.png";
import * as S from "./Sweet.styled";

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
        <S.SweetBlock>
          <S.SweetInfo>
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
            <S.DisplayNameSpan>{sweetObj.displayName}</S.DisplayNameSpan>
            <S.CreatedAtSpan>
              {" "}
              {format(sweetObj.createdAt, "ko")}
            </S.CreatedAtSpan>
          </S.SweetInfo>
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
        </S.SweetBlock>
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
