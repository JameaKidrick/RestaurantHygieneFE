import styled from "styled-components";

export const ModalContainer = styled.div`
  border: 2px solid blue;
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  // height: 93%;
  // top: 8;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align:center;
  display: flex;

  #modalForm {
    // border: 2px solid red;
    color: black;
    width: 50%;
    margin: auto;
  }
  
  p {
    color: black;
  }
`;
