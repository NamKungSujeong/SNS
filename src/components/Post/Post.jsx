import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import PropTypes from "prop-types";

import Modal from "../common/Modal";
import PostEdit from "./PostEdit";
import PostShow from "./PostContent";

const Post = ({ postObj, isOwner }) => {
  const postRef = doc(dbService, "posts", `${postObj.id}`);
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(postObj.text);
  const [attachment, setAttachment] = useState(postObj.attachmentURL);

  const handleDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (ok) {
      await deleteDoc(postRef);

      if (postObj.attachmentURL !== "") {
        await deleteObject(ref(storageService, postObj.attachmentURL));
      }
    }
  };

  const handleToggleEditingClick = () => {
    setEditing((prev) => !prev);
    setAttachment(postObj.attachmentURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(postRef, {
      text: newPost,
      attachmentURL: attachment,
    });
    setEditing(false);
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
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
          <PostEdit
            postObj={postObj}
            handleSubmit={handleSubmit}
            handleAttachmentChange={handleAttachmentChange}
            newPost={newPost}
            handlePostChange={handlePostChange}
            attachment={attachment}
            handleClearAttachmentClick={handleClearAttachmentClick}
            handleToggleEditingClick={handleToggleEditingClick}
          />
        </Modal>
      ) : (
        <PostShow
          postObj={postObj}
          isOwner={isOwner}
          handleToggleEditingClick={handleToggleEditingClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </div>
  );
};

export default Post;

Post.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    attachmentURL: PropTypes.string,
    displayName: PropTypes.string,
    createdAt: PropTypes.number,
  }),
  isOwner: PropTypes.bool,
};
