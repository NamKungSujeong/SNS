import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin: auto;
`;

export const SweetContainer = styled.div`
  height: 490px;
  overflow: scroll;
  width: 100%;
  max-width: 320px;
  margin: 100px auto auto;
`;

export const Nav = styled.nav`
  position: fixed;
  background-color: white;
  display: flex;
  height: 70px;
`;

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`;

export const ProfileLi = styled.li`
  img {
    border-radius: 50%;
    border: 1px solid white;
    width: 40px;
    height: 40px;
  }
`;

export const HomeLi = styled.li`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  padding-left: 90px;
`;
