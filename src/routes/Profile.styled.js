import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin: auto;
`;

export const SweetContainer = styled.div`
  height: 365px;
  overflow: scroll;
`;

export const Nav = styled.nav`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border: 3px solid white;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const UserDisplayName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 10px;
`;

export const UserProfile = styled.section`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
`;

export const UpdateBtn = styled.div`
  text-align: end;

  button {
    text-align: right;
    position: relative;
    top: 25px;
    padding: 5px 10px;
    border-radius: 10px;

    &:hover {
      background-color: #04aaff;
      color: white;
    }
  }
`;
