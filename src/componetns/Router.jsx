import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SweetFactory from "routes/SweetFactory";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} />} />
            <Route path="/write" element={<SweetFactory userObj={userObj} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
      {isLoggedIn && (
        <WriteButton>
          <Link to="/write">
            <FontAwesomeIcon icon={faPenToSquare} size="xl" color="white" />
          </Link>
        </WriteButton>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;

export const WriteButton = styled.div`
  background-color: #04aaff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 80%;
  cursor: pointer;
`;
