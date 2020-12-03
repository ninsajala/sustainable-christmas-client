import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import AuthService from '../services/auth-service';

import Home from '../Homepage/Home';
import Recipes from '../Recipes/Recipes';
import Nav from '../Layout/Nav';
import Footer from '../Layout/Footer';
import TipsOverview from '../ChristmasTips/TipsOverview';
import AddTip from '../ChristmasTips/AddTip';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .loggedin()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  const getUser = (userObject) => {
    setLoggedInUser(userObject);
  };

  fetchUser();

  return (
    <main className='App'>
      <header>
        <Nav loggedInUser={loggedInUser} getUser={getUser} />
      </header>
      <Switch>
        {/* {loggedInUser && <Redirect from='/login' to='/' />} */}
        <Route exact path='/' component={Home} />
        <Route exact path='/recipes' component={Recipes} />
        <Route exact path='/tips/add' component={AddTip} />
        <Route exact path='/tips' component={TipsOverview} />
        <Route
          exact
          path='/signup'
          render={() => <Signup getUser={getUser} />}
        />
        <Route exact path='/login' render={() => <Login getUser={getUser} />} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
