import styled from "styled-components";

export const PostContent = styled.div`
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

export const PostInfo = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

export const PostBlock = styled.div`
  width: 100%;
  margin-left: 10px;
`;

export const SweerText = styled.p`
  margin: 10px 0;
`;

export const PostImg = styled.img`
  width: 250px;
`;

export const PostBtns = styled.div`
  text-align: right;
`;
