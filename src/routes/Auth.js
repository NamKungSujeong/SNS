import React from "react";
import { authService } from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "componetns/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <LoginContainer>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <SocialBtnBlock>
        <SocialBtn name="google" onClick={onSocialClick}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </SocialBtn>
        <SocialBtn name="github" onClick={onSocialClick}>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </SocialBtn>
      </SocialBtnBlock>
    </LoginContainer>
  );
};

export default Auth;

const LoginContainer = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SocialBtn = styled.button`
  background-color: white;
  padding: 10px 10px;
  border-radius: 20px;
  margin: 0 5px;
  border: 1px solid #aaa;

  &:hover {
    border: 1px solid #04aaff;
    background-color: #04aaff;
    color: white;
  }
`;

const SocialBtnBlock = styled.div`
  margin-top: 20px;
`;
