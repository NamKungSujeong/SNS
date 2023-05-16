import * as S from "./PostContent.styled";
import userInitPhoto from "../../asset/user.png";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "contexts/PostProvider";
import Avatar from "@mui/material/Avatar";
import DashBoard from "components/common/DashBoard";
import MenuItem from "@mui/material/MenuItem";

register("ko", koLocale);

const PostShow = ({
  postObj,
  isOwner,
  handleToggleEditingClick,
  handleDeleteClick,
}) => {
  const postConsumer = useContext(PostContext);
  const { setCreator } = postConsumer;

  const imgSrc = postObj.profilePhoto || userInitPhoto;

  const onProfileClick = () => {
    setCreator({
      id: postObj.creatorId,
      url: postObj.profilePhoto,
      displayName: postObj.displayName,
    });
  };

  return (
    <S.PostContent>
      <Link to="/profile">
        <Avatar src={imgSrc} alt="profile" onClick={onProfileClick} />
      </Link>
      <S.PostBlock>
        <S.PostInfo>
          <div>
            <S.DisplayName>{postObj.displayName}</S.DisplayName>
            <S.CreatedAtSpan>{format(postObj.createdAt, "ko")}</S.CreatedAtSpan>
          </div>
          {isOwner && (
            <DashBoard style={{ display: "inline-block" }}>
              <MenuItem onClick={handleToggleEditingClick}>Update</MenuItem>
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </DashBoard>
          )}
        </S.PostInfo>
        <S.SweerText>{postObj.text}</S.SweerText>
        {postObj.attachmentURL && (
          <S.PostImg src={postObj.attachmentURL} alt="file" />
        )}
      </S.PostBlock>
    </S.PostContent>
  );
};

export default PostShow;
