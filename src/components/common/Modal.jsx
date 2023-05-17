import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <ModalContainer>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};
export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 20;
  color: black;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 340px;
  height: 400px;
  background-color: white;
  border-radius: 20px;
`;
