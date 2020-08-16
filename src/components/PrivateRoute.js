import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component:Component, props, ...rest }) => {
  return(
    <Route 
      {...rest}
      render={props => {
        if(localStorage.getItem('token')) {
          return <Component {...props} persistor={rest.persistor} />
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  )
}

export default PrivateRoute;