import styled from "styled-components";

export const WriteContainer = styled.div``;

export const SweetForm = styled.form`
  margin: auto;
  height: 450px;
  width: 100%;
  max-width: 320px;
  margin-top: 40px;
`;

export const Textarea = styled.textarea`
  width: 320px;
  height: 150px;
  border: none;
  margin: 10px 0;
`;

export const BackBtn = styled.div`
  margin: 30px 0 0 20px;
`;

export const SubmitBtn = styled.button`
  position: relative;
  top: 40px;
  left: 80%;
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid #04aaff;

  &:hover {
    background-color: #04aaff;
    color: white;
  }
`;

export const ClearBtn = styled.button`
  position: relative;
  top: 10px;
  left: -13px;
`;
