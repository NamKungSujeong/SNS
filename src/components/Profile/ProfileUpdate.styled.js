import styled from "styled-components";

export const UpdateProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

export const CloseBtn = styled.button`
  position: relative;
  left: 90%;
  font-size: 1.2rem;
  padding: 10px 5px;
`;

export const FileLabel = styled.label`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 30px;

  div {
    position: relative;
    width: 110px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    position: absolute;
    opacity: 0.5;
  }
`;

export const DisplayNameInput = styled.input`
  height: 30px;
  padding-left: 10px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.1rem;
`;

export const UpdateBtn = styled.button`
  text-align: right;
  position: relative;
  top: 80px;
  left: 70px;
  padding: 5px 10px;
  border-radius: 10px;
  color: black;
  border: 2px solid var(--mainColor);

  &:hover {
    background-color: var(--mainColor);
    color: white;
  }
`;
