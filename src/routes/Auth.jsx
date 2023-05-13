import React from "react";
import { authService } from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import * as S from "./Auth.styled";

const Auth = () => {
  const handleSocialClick = async (e) => {
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
    <S.LoginContainer>
      <FontAwesomeIcon
        icon={faPaperPlane}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <S.SocialBtnBlock>
        <S.SocialBtn name="google" onClick={handleSocialClick}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </S.SocialBtn>
        <S.SocialBtn name="github" onClick={handleSocialClick}>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </S.SocialBtn>
      </S.SocialBtnBlock>
    </S.LoginContainer>
  );
};

export default Auth;
