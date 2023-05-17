import styled from "styled-components";

export const LoginContainer = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SocialBtn = styled.button`
  background-color: white;
  padding: 10px 10px;
  border-radius: 20px;
  margin: 0 5px;
  border: 1px solid #aaa;
  color: black;

  &:hover {
    border: 1px solid var(--mainColor);
    background-color: var(--mainColor);
    color: white;
  }
`;

export const SocialBtnBlock = styled.div`
  margin-top: 20px;
`;
