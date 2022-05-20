import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useAppDispatch, useAppSelector } from './config/store';
import { isEmpty } from 'lodash';
import Cookies from 'universal-cookie';
import { getSession } from './shared/reducers/authentication';
import ProtectedRoutes from './routes/ProtectedRoutes';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '');

// Private route restrict to access public pages after login.
const PrivateRoute = ({children, isAuthenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={({location}) =>
        (isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location},
            }}
          />
        ))
      }
    />
  );
}

// Public route restrict to access authenticated pages before login.
const PublicRoute = ({children, isAuthenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        ({location}) =>
          (!isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/dashboard',
                state: {from: location},
              }}
            />
          ))
      }
    />
  );
}

export const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);

  useEffect(() => {
    const cookie = new Cookies();
    if (!isEmpty(cookie.get('access_token'))) {
      dispatch(getSession());
      logAppVersion();
    }
  }, []);

  const logAppVersion = () => {
    console.debug('PromptDee version: 1.1.0');
  };

  return (
    <Router basename={baseHref}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
            <LoginPage />
          </PublicRoute>
          <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
            <ProtectedRoutes />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
