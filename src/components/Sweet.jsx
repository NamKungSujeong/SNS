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
import { faPen, faTrashCan, faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { Attachment } from "routes/Write";

register("ko", koLocale);

const Sweet = ({ sweetObj, isOwner }) => {
  const sweetRef = doc(dbService, "sweets", `${sweetObj.id}`);
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  const [attachment, setAttachment] = useState(sweetObj.attachmentURL);

  const handleDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (ok) {
      await deleteDoc(sweetRef);

      if (sweetObj.attachmentURL !== "") {
        await deleteObject(ref(storageService, sweetObj.attachmentURL));
      }
    }
  };

  const handleToggleEditingClick = () => {
    setEditing((prev) => !prev);
    setAttachment(sweetObj.attachmentURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(sweetRef, {
      text: newSweet,
      attachmentURL: attachment,
    });
    setEditing(false);
  };

  const handleSweetChange = (e) => {
    setNewSweet(e.target.value);
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

  return (
    <div>
      {editing ? (
        <Modal
          props={
            <EditMode
              sweetObj={sweetObj}
              handleSubmit={handleSubmit}
              handleAttachmentChange={handleAttachmentChange}
              newSweet={newSweet}
              handleSweetChange={handleSweetChange}
              attachment={attachment}
              handleClearAttachmentClick={handleClearAttachmentClick}
              handleToggleEditingClick={handleToggleEditingClick}
            />
          }
        />
      ) : (
        <SweetBlock
          sweetObj={sweetObj}
          isOwner={isOwner}
          handleToggleEditingClick={handleToggleEditingClick}
          handleDeleteClick={handleDeleteClick}
        />
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

const EditMode = ({
  sweetObj,
  handleSubmit,
  handleAttachmentChange,
  newSweet,
  handleSweetChange,
  attachment,
  handleClearAttachmentClick,
  handleToggleEditingClick,
}) => {
  return (
    <>
      <S.EditBlock>
        {sweetObj.profilePhoto ? (
          <S.ProfileImgEdit src={sweetObj.profilePhoto} alt="profile" />
        ) : (
          <S.ProfileImgEdit src={userInitPhoto} alt="profile" />
        )}
        <S.Form onSubmit={handleSubmit}>
          <label htmlFor="file">
            <FontAwesomeIcon icon={faImage} size="xl" />
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleAttachmentChange}
            style={{ display: "none" }}
          />
          <S.TextArea
            value={newSweet}
            placeholder="Edit"
            required
            onChange={handleSweetChange}
          />
          {attachment && (
            <Attachment
              attachment={attachment}
              handleClearAttachmentClick={handleClearAttachmentClick}
            />
          )}
          <S.EditBtns>
            <button type="submit">Update</button>
            <button onClick={handleToggleEditingClick}>Cancle</button>
          </S.EditBtns>
        </S.Form>
      </S.EditBlock>
    </>
  );
};

const SweetBlock = ({
  sweetObj,
  isOwner,
  handleToggleEditingClick,
  handleDeleteClick,
}) => {
  return (
    <S.SweetContent>
      {sweetObj.profilePhoto ? (
        <S.ProfileImg src={sweetObj.profilePhoto} alt="profile" />
      ) : (
        <S.ProfileImg src={userInitPhoto} alt="profile" />
      )}
      <S.SweetBlock>
        <S.SweetInfo>
          <S.DisplayName>{sweetObj.displayName}</S.DisplayName>
          <S.CreatedAtSpan>{format(sweetObj.createdAt, "ko")}</S.CreatedAtSpan>
        </S.SweetInfo>
        <S.SweerText>{sweetObj.text}</S.SweerText>
        {sweetObj.attachmentURL && (
          <S.SweetImg src={sweetObj.attachmentURL} alt="file" />
        )}
        {isOwner && (
          <S.SweetBtns>
            <button onClick={handleToggleEditingClick}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </S.SweetBtns>
        )}
      </S.SweetBlock>
    </S.SweetContent>
  );
};
