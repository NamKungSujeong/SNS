import { authService } from "fbase";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styled from "styled-components";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <FormSection>
      <Form onSubmit={onSubmit}>
        <InputUser
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
        <InputUser
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="on"
        />
        <InputSubmit
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </Form>
      <div>{error}</div>
      <ToggleClickBtn onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </ToggleClickBtn>
    </FormSection>
  );
};

export default AuthForm;

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

const InputUser = styled.input`
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

const InputSubmit = styled.input`
  width: 100%;
  max-width: 320px;
  height: 35px;
  background-color: #04aaff;
  border-radius: 15px;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #0661d0;
    transition: all 0.2s linear;
  }
`;

const ToggleClickBtn = styled.span`
  text-decoration: underline;
  color: #04aaff;
  text-align: center;
  cursor: pointer;
`;
