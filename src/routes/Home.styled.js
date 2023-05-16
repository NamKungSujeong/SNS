import styled from "styled-components";

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  // max-width: 320px;
  margin: auto;
`;

export const PostContainer = styled.div`
  height: 520px;
  overflow: scroll;
  width: 100%;
  max-width: 320px;
  margin: auto;
`;

export const Nav = styled.nav`
  background-color: white;
  display: flex;
  height: 70px;
  border-radius: 10px 10px 0 0;
`;

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`;

export const ProfileLi = styled.li`
  cursor: pointer;
`;

export const HomeLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  height: 66px;
`;
