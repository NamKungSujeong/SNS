import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import PropTypes from "prop-types";

import Modal from "../common/Modal";
import SweetEdit from "./PostEdit";
import SweetShow from "./PostContent";

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
        <Modal>
          <SweetEdit
            sweetObj={sweetObj}
            handleSubmit={handleSubmit}
            handleAttachmentChange={handleAttachmentChange}
            newSweet={newSweet}
            handleSweetChange={handleSweetChange}
            attachment={attachment}
            handleClearAttachmentClick={handleClearAttachmentClick}
            handleToggleEditingClick={handleToggleEditingClick}
          />
        </Modal>
      ) : (
        <SweetShow
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