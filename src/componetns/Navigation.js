import React from "react";
import { Link } from "react-router-dom";
import user from "../asset/user.png";
import styled from "styled-components";

const Navigation = ({ userObj }) => {
  return (
    <Nav>
      <Ul>
        <ProfileLi>
          <Link to="/profile">
            {/* {userObj.displayName}'s Profile */}
            <img src={user} alt="profile" style={{ width: "35px" }} />
          </Link>
        </ProfileLi>
        <HomeLi>
          <Link to="/">Home</Link>
        </HomeLi>
      </Ul>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  margin: 20px 0 50px;
`;

const Ul = styled.ul`
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #aaa;
`;

const ProfileLi = styled.li`
  text-align: left;
  position: absolute;
  padding-left: 20px;
`;

const HomeLi = styled.li`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;
