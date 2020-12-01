import './App.css';
import Main from '../Homepage/main';
import Recipes from '../Recipes/Recipes';
import Nav from '../Layout/Nav';
import Footer from '../Layout/Footer';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <main className='App'>
      <header>
        <Nav />
      </header>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/recipes' component={Recipes} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
