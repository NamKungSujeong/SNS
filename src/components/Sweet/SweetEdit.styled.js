import styled from "styled-components";
import { ProfileImg } from "routes/Profile.styled";

export const EditBtns = styled.div`
  margin-top: 20px;
  text-align: right;

  button {
    padding: 5px 10px;
    border-radius: 10px;
    border: 2px solid #04aaff;
    margin: 0 5px;

    &:hover {
      background-color: #04aaff;
      color: white;
    }
  }
`;

export const ProfileImgEdit = styled(ProfileImg)`
  margin: 15px 15px 0 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 230px;
  margin-top: 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  margin-top: 5px;
  padding-left: 10px;
`;

export const EditBlock = styled.div`
  display: flex;
  justify-content: center;
`;
