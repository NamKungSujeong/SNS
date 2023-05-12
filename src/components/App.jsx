import { useEffect, useContext } from "react";
import AppRouter from "./Router";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import * as S from "./App.styled";
import { AuthContext } from "../contexts/AuthProvider";

function App() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".loading").style.opacity = 0;
      document.querySelector(".loading").style.zIndex = -100;
    }, 2000);
  }, []);

  const authConsumer = useContext(AuthContext);
  const { init } = authConsumer;

  return (
    <S.AppBlock>
      <Loading />
      <S.AppContainer>
        <S.AppContent>
          {init ? (
            <>
              <AppRouter />
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
