import styled from "styled-components";

export const ParentContainer = styled.div`
  // border: 2px solid red;
  width: 65%;
  margin: 3rem 0 0 3rem;

  #header {
    font-weight: bold;
    font-size: 1.3rem;
  }

  .card {
    // border: 2px solid black;
    border-bottom: 2px solid black;
    // border-radius: 1rem;
    padding: 0.5rem;
    padding-top: ${props => props.section ? '1.5rem':''};
    // margin: 1rem 0 1rem 0;
    margin-top: 1rem;
  }

  .restaurantName {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .review {
    margin-bottom: 0.5rem;
  }

  .ratingContainer {
    // border: 2px solid green;
    display: flex;
    // margin: 0 auto;
    // justify-content: center;
    margin-top: 0.5rem;
    margin: 0.5rem 0;
  }

  #ratingStars {
    // border: 2px solid green;
    // margin-right: 0.5rem;
  }

  .ratingScore {
    // border: 2px solid blue;
    display: flex;
    align-items: center;
    // margin-left: 0.5rem;
    justify-content: center;
    width: 5%;
    font-weight: bold;
  }

  .buttonContainer {
    // border: 2px solid black;
    width: 7rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  #editButton {
    padding: 0.5rem;
    border-radius: 0.2rem;
    transition: 0.5s;
    background: white;
    border: 1px solid black;
    color: black;
    cursor: pointer;
    &:hover{
      background: black;
      color: white;
    }
  }

  #deleteButton {
    padding: 0.5rem;
    border-radius: 0.2rem;
    transition: 0.5s;
    border: 1px solid red;
    background: white;
    color: red;
    cursor: pointer;
    &:hover{
      background: red;
      color: white;
    }
  }
`