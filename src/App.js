import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import facade from './apiFacade';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = facade.getUser();
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/dashboard">
          <DashBoard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/404">
          <NoMatch />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
}
export default App;

function NoMatch() {
  return (
    <div>
      <h2>Page not found</h2>
    </div>
  );
}
