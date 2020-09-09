import styled from "styled-components";

export const Results = styled.div`
  // border: 2px solid red;
  width: 100%;
  margin-top: 5rem;
  margin-left: 3rem;
  margin-right: 4rem;

  .cards {
    // border: 2px solid pink;
    display: flex;
    flex-wrap: wrap;
  }

  .singleRestaurant {
    border: 2px solid black;
    width: 30%;
    margin: 0.5rem;
    padding: 0.5rem;
  }

  #favorite {
    display: flex;
    // border: 2px solid black;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid black;
  }

  .heartIcon {
    margin-right: 0.5rem;
  }

  .heartIcon .favorited {
    color: red;
  }

  .restaurantName {
    font-weight: bold;
  }

  .subtitle {
    font-size: 0.9rem;
  }
  
  .rating div {
    display: flex;
    // alignItems: center;
  }

  .avg {
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }

  #stars {
    font-size: 1.2rem;
  }

  #address {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .pageDirections {
    // border: 2px solid red;
    padding: 0.5rem;
    width: 25%;
    margin: 0 auto;
  }

  .back {
    // border: 2px solid blue;
  }

  .next {
    // border: 2px solid blue;
  }
`;
