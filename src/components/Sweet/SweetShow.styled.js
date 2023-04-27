import styled from "styled-components";

export const SweetContent = styled.div`
  border-bottom: 1px solid #aaa;
  padding: 10px 5px;
  display: flex;
  &:hover {
    background-color: #dedede;
  }
`;

export const DisplayName = styled.h3`
  display: inline-block;
  font-weight: 500;
  font-size: 1rem;
`;

export const CreatedAtSpan = styled.span`
  color: #aaa;
  margin-left: 10px;
`;

export const SweetInfo = styled.div`
  margin-bottom: 10px;
`;

export const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border: 1px solid white;
  border-radius: 50%;
`;

export const SweetBlock = styled.div`
  width: 100%;
  margin-left: 10px;
`;

export const SweerText = styled.p`
  margin: 10px 0;
`;

export const SweetImg = styled.img`
  width: 100%;
`;

export const SweetBtns = styled.div`
  text-align: right;
`;
