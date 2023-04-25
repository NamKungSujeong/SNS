import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import * as S from "./App.styled";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isWrite, setIsWrite] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".loading").style.opacity = 0;
      document.querySelector(".loading").style.zIndex = -100;
    }, 2000);
    onAuthStateChanged(authService, (user) => {
      if (user) {
        if (user.displayName == null) {
          const userName = user.email.split("@")[0];
          user.displayName = userName;
        }
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInin(true);
      setIsWrite(false);
    });
  }, []);

  return (
    <S.AppBlock>
      <Loading />
      <S.AppContainer>
        <S.AppContent>
          {init ? (
            <>
              <AppRouter
                isLoggedIn={isLoggedIn}
                userObj={userObj}
                isWrite={isWrite}
              />
            </>
          ) : (
            <div>로딩중...</div>
          )}
        </S.AppContent>
      </S.AppContainer>
    </S.AppBlock>
  );
}

export default App;

App.propTypes = {
  userObj: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool,
};

const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        backgroundColor: "#04aaff",
        width: "100%",
        height: "100vh",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <FontAwesomeIcon icon={faTwitter} color={"white"} size="3x" beat />
    </div>
  );
};
