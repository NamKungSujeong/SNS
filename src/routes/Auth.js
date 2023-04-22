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
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  text-align: center;
`;

const SocialBtn = styled.button`
  background-color: white;
  padding: 10px 10px;
  border-radius: 20px;
  margin: 0 5px;

  &:hover {
    background-color: #dcd4d4;
  }
`;

const SocialBtnBlock = styled.div`
  margin-top: 20px;
`;
