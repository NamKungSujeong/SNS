import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import PropTypes from "prop-types";
import styled from "styled-components";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInin] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
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

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };
  return (
    <AppBlock>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "로딩중..."
      )}
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
  max-width: 370px;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
`;
