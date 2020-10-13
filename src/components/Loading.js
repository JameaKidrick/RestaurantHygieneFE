import React from 'react';
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";
import styled from 'styled-components';

const override = css`
  display: block;
  margin: 25% auto;
`;

const Loader = styled.div`
  // border: ${props => props.section === 'results' ? '2px solid red':''};
  width: ${props => props.section === 'results' ? '100%':''};
  margin:  ${props => props.section === 'results' ? '5rem 4rem 0 3rem':''};
  // height: 810vh;
`

const Loading = (props) => {
  return(
    <Loader section={props.section}>
      <MoonLoader
          css={override}
          size={60}
          color={'#FF0000'}
        />
    </Loader>
  )
}

export default Loading;