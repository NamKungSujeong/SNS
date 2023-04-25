import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WriteBtn = () => {
  return (
    <WriteButton>
      <Link to="/write">
        <FontAwesomeIcon icon={faPenToSquare} size="xl" color="white" />
      </Link>
    </WriteButton>
  );
};

export default WriteBtn;

export const WriteButton = styled.div`
  background-color: #04aaff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 85%;
  cursor: pointer;
`;
