import { useEffect, useContext } from "react";
import AppRouter from "./Router";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./App.styled";
import { AuthContext } from "../contexts/AuthProvider";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
      <S.AppContainer>
        <Loading />
        <S.AppContent>
          {init ? (
            <>
              <AppRouter />
            </>
          ) : (
            <Loading />
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
        backgroundColor: "var(--mainColor)",
        width: "100%",
        maxWidth: "370px",
        height: "650px",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        borderRadius: "10px",
      }}
    >
      <FontAwesomeIcon icon={faPaperPlane} color={"white"} size="3x" beat />
    </div>
  );
};
