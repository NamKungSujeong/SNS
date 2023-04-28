import { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import SweetFactory from "routes/Write";
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
  const [creator, setcreator] = useState({ id: "", url: "", displayName: "" });

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
        setcreator({
          id: user.uid,
          url: user.photoURL,
          displayName: user.displayName,
        });
      } else {
        setIsLoggedIn(false);
      }
      setInin(true);
    });
  }, []);

  const propsApp = (dataId, dataProfile, dataName) => {
    setcreator({ id: dataId, url: dataProfile, displayName: dataName });
  };

  return (
    <S.AppBlock>
      <Loading />
      <S.AppContainer>
        <S.AppContent>
          {init ? (
            <>
              <HashRouter>
                <Routes>
                  {isLoggedIn ? (
                    <>
                      <Route
                        path="/"
                        element={<Home userObj={userObj} propsApp={propsApp} />}
                      />
                      <Route
                        path="/profile"
                        element={
                          <Profile userObj={userObj} creator={creator} />
                        }
                      />
                      <Route
                        path="/write"
                        element={<SweetFactory userObj={userObj} />}
                      />
                    </>
                  ) : (
                    <Route path="/" element={<Auth />} />
                  )}
                </Routes>
              </HashRouter>
              {/* <AppRouter
                isLoggedIn={isLoggedIn}
                userObj={userObj}
                test4={test4}
              /> */}
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
