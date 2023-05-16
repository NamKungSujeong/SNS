import styled from "styled-components";

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PostContainer = styled.section`
  height: 365px;
  overflow: scroll;
  padding: 20px;
`;

export const Nav = styled.nav`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 0 20px;
`;

export const UserDisplayName = styled.span`
  font-size: 1.1rem;
  margin: 10px 10px 0 10px;
  color: white;
`;

export const UserProfile = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UpdateBtn = styled.div`
  color: white;
`;

export const ProfileBlock = styled.div`
  background-color: var(--mainColor);
  border-radius: 10px 10px 0 0;
  height: 223px;
`;
