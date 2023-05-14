import * as S from "./SweetShow.styled";
import userInitPhoto from "../../asset/user.png";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SweetContext } from "contexts/SweetProvider";
import Avatar from "@mui/material/Avatar";
import DashBoard from "components/DashBoard";
import MenuItem from "@mui/material/MenuItem";

register("ko", koLocale);

const SweetShow = ({
  sweetObj,
  isOwner,
  handleToggleEditingClick,
  handleDeleteClick,
}) => {
  const sweetConsumer = useContext(SweetContext);
  const { setCreator } = sweetConsumer;

  const imgSrc = sweetObj.profilePhoto || userInitPhoto;

  const onProfileClick = () => {
    setCreator({
      id: sweetObj.creatorId,
      url: sweetObj.profilePhoto,
      displayName: sweetObj.displayName,
    });
  };

  return (
    <S.SweetContent>
      <Link to="/profile">
        <Avatar src={imgSrc} alt="profile" onClick={onProfileClick} />
      </Link>
      <S.SweetBlock>
        <S.SweetInfo>
          <div>
            <S.DisplayName>{sweetObj.displayName}</S.DisplayName>
            <S.CreatedAtSpan>
              {format(sweetObj.createdAt, "ko")}
            </S.CreatedAtSpan>
          </div>
          {isOwner && (
            <DashBoard style={{ display: "inline-block" }}>
              <MenuItem onClick={handleToggleEditingClick}>Update</MenuItem>
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </DashBoard>
          )}
        </S.SweetInfo>
        <S.SweerText>{sweetObj.text}</S.SweerText>
        {sweetObj.attachmentURL && (
          <S.SweetImg src={sweetObj.attachmentURL} alt="file" />
        )}
      </S.SweetBlock>
    </S.SweetContent>
  );
};

export default SweetShow;
