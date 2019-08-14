import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import withAuth from '../hoc/withAuth';

const AnonRoute = (props) => {
  const {isLoggedIn, component: Component, ...rest} = props;
  return (
    <>
      {!isLoggedIn ?  <Route 
        render={(props) => {
          return <Component {...props}/>
        }}
        {...rest}
      /> : <Redirect to='/' />}
    </>

   
  );
}

export default withAuth(AnonRoute);
