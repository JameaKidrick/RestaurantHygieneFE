import styled from 'styled-components'

export const Nav = styled.nav`
  border: 2px solid red;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  .logoContainer {
    // border: 2px solid blue;
    display: flex;
    align-items: center;
  }

  .links {
    // border: 2px solid green;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 40rem;
  }
`

// REMOVE TEXT DECORATION FOR ALL LINKS (MAY HAVE TO ADD THIS TO THE GLOBAL STYLES)