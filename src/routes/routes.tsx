import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Counter } from '../features/counter/Counter';
import PageNotFound from '../shared/error/page-not-found';

const Home = () => {
  return <h2>Home (Protected: authenticated user required)</h2>;
};

const Dashboard = () => {
  return <h2>Dashboard (Protected: authenticated user required)</h2>;
};

const Analytics = () => {
  return (
    <h2>
      Analytics (Protected: authenticated user with permission
      'analyze' required)
    </h2>
  );
};

const Admin = () => {
  return (
    <h2>
      Admin (Protected: authenticated user with role 'admin' required)
    </h2>
  );
};

const Routes = () => {
  return (
    <div className="view-routes">
      <Switch>
        <Route exact path="/" component={Counter}></Route>
        <Route path="/counter" component={Counter}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/analytics" component={Analytics}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </div>
  );
};

export default Routes;
