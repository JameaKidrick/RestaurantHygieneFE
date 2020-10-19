import styled from 'styled-components'

export const Nav = styled.nav`
  // border: 2px solid red;
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  .logoContainer {
    // border: 2px solid blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon {
    margin-right: 2rem;
  }

  h2{
    font-size: 1.5rem;
    font-weight: bold;
  }

  .links {
    // border: 2px solid green;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 40rem;
  }

  .links .link {
    &:hover {
      color: red;
      transition: 0.5s;
    };
  }

  .links .active {
    color: red;
  }
`