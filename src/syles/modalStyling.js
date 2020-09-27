import styled from "styled-components";

export const ModalContainer = styled.div`
  // border: 2px solid blue;
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
  text-align: center;
  display: flex;

  #modalForm {
    border: 2px solid black;
    color: black;
    width: 30%;
    margin: auto;
    padding-top: 1rem;
    border-radius: 1rem;
    background: white;
  }

  p {
    color: black;
    font-weight: bold;
  }

  form p span {
    color: red;
  }

  form p p {
    font-weight: bold;
  }

  .buttonContainer {
    // border: 2px solid red;
    margin: 0 auto;
    margin-top: 1rem;
    display: flex;
    width: 10rem;
  }

  #reviewInfo {
    // border: 2px solid green;
    text-align: left;
    margin-left: 1rem;
  }

  .rating {
    margin-bottom: 1rem;
  }

  .reviewContainer {
    // border: 2px solid green;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    margin-top: 1rem;
  }

  #ratingStars {
    // border: 2px solid green;
    margin-right: 0.5rem;
  }

  .ratingScore {
    // border: 2px solid blue;
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    justify-content: flex-end;
    width: 5%;
  }
`;
