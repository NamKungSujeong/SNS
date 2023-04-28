import * as S from "./SweetShow.styled";
import userInitPhoto from "../../asset/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import { Link } from "react-router-dom";

register("ko", koLocale);

const SweetShow = ({
  sweetObj,
  isOwner,
  handleToggleEditingClick,
  handleDeleteClick,
  propsSweet,
}) => {
  const imgSrc = sweetObj.profilePhoto || userInitPhoto;

  const onProfilelClick = () => {
    propsSweet(sweetObj.creatorId, sweetObj.profilePhoto, sweetObj.displayName);
  };

  return (
    <S.SweetContent>
      <Link to="/profile">
        <S.ProfileImg src={imgSrc} alt="profile" onClick={onProfilelClick} />
      </Link>
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

export default SweetShow;
