import styled from "styled-components";

export const SingleRestaurantPage = styled.div`
  // border: 2px solid red;
  margin: 5rem 3rem 0 3rem;

  #header {
    // border: 2px solid blue;
    display: flex;
  }

  #restaurant_name {
    font-weight: bold;
    font-size: 1.3rem;
    margin-right: 1rem;
  }

  #restaurant_address {
    font-size: 0.8rem;
    margin-right: 1rem;
  }

  #avgHygiene {
    // border: 2px solid green;
    margin: 1rem 0 0.3rem 0;
  }

  #avgHygiene span {
    font-weight: bold;
    margin-right: 0.3rem;
  }

  .reviews_header {
    // border: 2px solid purple;
    display: flex;
    margin: 0.5rem 0 0 0;
  }

  .reviews_header p {
    font-weight: bold;
  }

  .reviews_message {
    margin-top: 0.3rem;
  }

  .user_reviews {
    padding-bottom: 3rem;
    border-bottom: 2px solid black;
  }
`;

export const Opening_hours = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.color};
`;
