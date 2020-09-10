import styled from "styled-components";

export const Results = styled.div`
  display: ${props => props.results ? '': 'none'};
  // border: 2px solid red;
  width: 100%;
  margin: 5rem 4rem 0 3rem;

  // TOP RIGHT BOTTOM LEFT

  .cards {
    // border: 2px solid blue;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0rem 0 5rem;
  }

  .singleRestaurant {
    border: 2px solid black;
    width: 30%;
    // margin: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem 0.5rem 0.5rem 0;
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
    // border: 2px solid green;
    padding: 0.5rem;
    // margin-left: 3rem;
    // width: 25%;
    // margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .back {
    // border: 2px solid blue;
  }

  .next {
    // border: 2px solid blue;
  }

  .disabledLink {
    // border: 2px solid blue;
    color: grey;
    cursor: default;
  }
`;
