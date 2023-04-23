import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInin] = useState(false);
  const [userObj, setUserObj] = useState(null);

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
    });
  }, []);

  return (
    <AppBlock>
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
      <AppContainer>
        <AppContent>
          {init ? (
            <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
          ) : (
            <div
              style={{
                backgroundColor: "#04aaff",
                width: "100%",
                height: "100vh",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
          )}
        </AppContent>
      </AppContainer>
    </AppBlock>
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

const AppBlock = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 370px;
`;

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppContent = styled.div`
  width: 100%;
  height: 660px;
  max-width: 370px;
  border: 1px solid black;
  border-radius: 20px;
`;
