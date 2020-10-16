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

  .buttonContainer {
    // border: 2px solid green;
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: 0 auto;
    margin-top: 2rem;
  }

  .demo {
    // border: 2px solid black;
  }

  .first {
    // border: 2px solid red;
    // width: 80%;
    margin: 0 auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
  }

  .second {
    border: 2px solid green;
    width: 80%;
    margin: 0 auto;
  }

  #palette {
    display: flex;
  }

  .box {
    // border: 2px solid black;
    width: 10rem;
    // margin: 0 0.5rem;
    text-align: center;
    height: 10rem;
    color: white;
  }
  
  .one {
    background-color: #1e1d46;
  }
  
  .two {
    background-color: #0f838b;
  }
  
  .three {
    background-color: #0a6f71;
  }
  
  .four {
    background-color: #f3c911;
  }
  
  .five {
    background-color: #f6bc0d;
  }
  
  .six {
    background-color: #e6e5d1;
  }
`