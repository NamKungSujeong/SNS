import { Attachment } from "../../routes/Write";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import * as S from "./PostEdit.styled";

export const PostEdit = ({
  handleSubmit,
  handleAttachmentChange,
  newPost,
  handlePostChange,
  attachment,
  handleClearAttachmentClick,
  handleToggleEditingClick,
}) => {
  return (
    <S.EditBlock>
      <S.Form onSubmit={handleSubmit}>
        <label htmlFor="file">
          <FontAwesomeIcon icon={faImage} size="xl" />
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleAttachmentChange}
        />
        <S.TextArea
          value={newPost}
          placeholder="Edit"
          required
          onChange={handlePostChange}
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
  );
};

export default PostEdit;
