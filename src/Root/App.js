import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import AuthService from '../services/auth-service';

import Home from '../components/Homepage/Home';
import Recipes from '../components/Recipes/Recipes';
import Nav from '../components/Layout/Nav';
import Footer from '../components/Layout/Footer';
import TipsOverview from '../components/ChristmasTips/TipsOverview';
import AddTip from '../components/ChristmasTips/AddTip';
import Signup from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import MyProfile from '../components/Profile/MyProfile';
import EditProfile from '../components/Profile/EditProfile';
import TipDetails from '../components/ChristmasTips/TipDetails';
import EditTip from '../components/ChristmasTips/EditTip';
import RecipeDetails from '../components/Recipes/RecipeDetails';
import CharityList from '../components/charity/CharityList';
import OtherProfile from '../components/Profile/OtherProfile';

function App() {
  const initialValue = JSON.parse(localStorage.getItem('user')) || null;
  const [loggedInUser, setLoggedInUser] = useState(initialValue);

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .loggedin()
        .then((response) => {
          console.log(`loggedin user:`, response);
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  const getUser = (userObject) => {
    setLoggedInUser(userObject);
    localStorage.setItem(`user`, JSON.stringify(userObject));
    console.log(`Get user says:`, userObject);
  };

  fetchUser();

  return (
    <main className='App container-fluid'>
      <Nav loggedInUser={loggedInUser} getUser={getUser} />
      <section className='middleSection'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/recipes/:id' component={RecipeDetails} />
          <Route exact path='/recipes' component={Recipes} />
          <Route
            exact
            path='/tips/add'
            render={() => (
              <AddTip loggedInUser={loggedInUser} getUser={getUser} />
            )}
          />
          <Route
            exact
            path='/tips/edit/:id'
            render={() => <EditTip loggedInUser={loggedInUser} />}
          />
          <Route
            exact
            path='/tips'
            render={() => <TipsOverview loggedInUser={loggedInUser} />}
          />
          <Route
            exact
            path='/tips/:id'
            render={() => (
              <TipDetails loggedInUser={loggedInUser} getUser={getUser} />
            )}
          />
          <Route
            exact
            path='/signup'
            render={() => (
              <Signup getUser={getUser} loggedInUser={loggedInUser} />
            )}
          />
          <Route
            exact
            path='/login'
            render={() => (
              <Login getUser={getUser} loggedInUser={loggedInUser} />
            )}
          />
          <Route
            exact
            path='/myprofile'
            render={() => (
              <MyProfile loggedInUser={loggedInUser} getUser={getUser} />
            )}
          />
          <Route
            exact
            path='/myprofile/edit'
            render={() => (
              <EditProfile loggedInUser={loggedInUser} getUser={getUser} />
            )}
          />
          <Route
            exact
            path='/profile/:id'
            render={() => (
              <OtherProfile loggedInUser={loggedInUser} getUser={getUser} />
            )}
          />
          <Route exact path='/charity' component={CharityList} />
        </Switch>
      </section>
      <Footer />
    </main>
  );
}

export default App;
