import * as S from "./SweetShow.styled";
import userInitPhoto from "../../asset/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

const SweetShow = ({
  sweetObj,
  isOwner,
  handleToggleEditingClick,
  handleDeleteClick,
}) => {
  const imgSrc = sweetObj.profilePhoto || userInitPhoto;

  return (
    <S.SweetContent>
      <S.ProfileImg src={imgSrc} alt="profile" />
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
