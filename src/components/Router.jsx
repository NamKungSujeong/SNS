import { useContext } from "react";

import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import SweetFactory from "routes/Write";
import { AuthContext } from "../contexts/AuthProvider";

const AppRouter = () => {
  const authConsumer = useContext(AuthContext);
  const { isLoggedIn } = authConsumer;
  return (
    <HashRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/write" element={<SweetFactory />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
