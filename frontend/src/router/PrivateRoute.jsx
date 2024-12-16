import React, { useContext } from 'react';
import { Context } from '..';
import { PATHS } from '.';
import { Route, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

const PrivateRoute = ({ component}) => {
  const navigate=useNavigate()
  return localStorage.getItem("access_token")!=null?component:navigate(PATHS.AUTH)
};

export default observer(PrivateRoute);
