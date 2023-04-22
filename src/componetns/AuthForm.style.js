import styled from "styled-components";

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

export const InputUser = styled.input`
  width: 100%;
  max-width: 320px;
  height: 35px;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 15px;
  padding-left: 15px;
  color: black;
  text-align: left;
`;

export const InputSubmit = styled.button`
  width: 100%;
  max-width: 320px;
  height: 35px;
  background-color: #04aaff;
  border-radius: 15px;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: #0661d0;
    transition: all 0.2s linear;
  }
`;

export const ToggleClickBtn = styled.span`
  text-decoration: underline;
  color: #04aaff;
  text-align: center;
  cursor: pointer;
`;

export const ErrorMsg = styled.span`
  color: red;
  margin-bottom: 10px;
`;
