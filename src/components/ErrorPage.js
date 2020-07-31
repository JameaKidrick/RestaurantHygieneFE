import React from 'react';

const ErrorPage = (props) => {
  return(
    <h3>
      404 Page Not Found
      <div to='' onClick={()=>props.history.goBack()}>{'<--- Retreat'}</div>
    </h3>
  )
};

export default ErrorPage;