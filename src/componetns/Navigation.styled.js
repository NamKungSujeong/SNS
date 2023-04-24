import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  min-width: 370px;
  background-color: white;
  display: flex;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid #aaa;
`;

export const Ul = styled.ul`
  width: 100%;
  padding-bottom: 20px;
`;

export const ProfileLi = styled.li`
  text-align: left;
  position: absolute;
  padding-left: 20px;
  display: inline-block;
`;

export const HomeLi = styled.li`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  top: 10px;
`;
