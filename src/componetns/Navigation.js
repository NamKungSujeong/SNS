import React, { useNavigate } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { authService } from "fbase";

const Navigation = ({ userObj }) => {
  const navigate = useNavigate;

  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };
  return (
    <Nav>
      <Ul>
        <ProfileLi>
          <Link to="/profile">
            <img
              src={userObj.photoURL}
              alt="profile"
              style={{ width: "35px" }}
            />
          </Link>
        </ProfileLi>
        <HomeLi>
          <Link to="/">Home</Link>
        </HomeLi>
      </Ul>
      <button onClick={onLogoutClick}>log out</button>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  position: fixed;
  min-width: 370px;
  background-color: white;
  display: flex;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid #aaa;
`;

const Ul = styled.ul`
  width: 100%;
  padding-bottom: 20px;
`;

const ProfileLi = styled.li`
  text-align: left;
  position: absolute;
  padding-left: 20px;
  display: inline-block;
`;

const HomeLi = styled.li`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  top: 10px;
`;
