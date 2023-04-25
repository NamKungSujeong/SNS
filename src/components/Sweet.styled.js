import styled from "styled-components";

export const SweetContent = styled.div`
  border-bottom: 1px solid #aaa;
  padding: 10px 5px;
  display: flex;
  &:hover {
    background-color: #dedede;
  }
`;

export const DisplayName = styled.h3`
  display: inline-block;
  font-weight: 500;
  font-size: 1rem;
`;

export const CreatedAtSpan = styled.span`
  color: #aaa;
  margin-left: 10px;
`;

export const SweetInfo = styled.div`
  margin-bottom: 10px;
`;

export const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border: 1px solid white;
  border-radius: 50%;
`;

export const SweetBlock = styled.div`
  width: 100%;
  margin-left: 10px;
`;

export const SweerText = styled.p`
  margin: 10px 0;
`;

export const SweetImg = styled.img`
  width: 100%;
  height: 150px;
`;

export const SweetBtns = styled.div`
  text-align: right;
`;

export const EditBlock = styled.div`
  display: flex;
  justify-content: center;
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

export const ProfileImgEdit = styled(ProfileImg)`
  margin: 15px 15px 0 0;
`;

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
