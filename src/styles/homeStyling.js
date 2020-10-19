import styled from "styled-components";

export const HomePage = styled.div`
  // border: 2px solid red;
  padding-top: 3rem; 
  padding-right: 5rem;

  img {
    height: 35rem; 
    width: 45rem; 
    marginTop: 3rem; 
    marginLeft: 3rem;
  }

  #header {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .container {
    display: flex;
  }

  .marketingContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`