import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import PropTypes from "prop-types";
import userInitPhoto from "../asset/user.png";
import * as S from "./Sweet.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
        <S.SweetContainer>
          {sweetObj.profilePhoto ? (
            <S.ProfileImg src={sweetObj.profilePhoto} alt="profile" />
          ) : (
            <S.ProfileImg src={userInitPhoto} alt="profile" />
          )}
          <S.SweetBlock>
            <S.SweetInfo>
              <S.DisplayNameSpan>{sweetObj.displayName}</S.DisplayNameSpan>
              <S.CreatedAtSpan>
                {format(sweetObj.createdAt, "ko")}
              </S.CreatedAtSpan>
            </S.SweetInfo>
            <S.SweerText>{sweetObj.text}</S.SweerText>
            {sweetObj.attachmentURL && (
              <S.SweetImg src={sweetObj.attachmentURL} alt="file" />
            )}
            {isOwner && (
              <S.SweetBtns>
                <button onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </S.SweetBtns>
            )}
          </S.SweetBlock>
        </S.SweetContainer>
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
