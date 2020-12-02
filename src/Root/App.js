//import 'bulma/css/bulma.css';
import './App.css';
import Home from '../Homepage/Home';
import Recipes from '../Recipes/Recipes';
import Nav from '../Layout/Nav';
import Footer from '../Layout/Footer';
import { Switch, Route } from 'react-router-dom';
import TipsOverview from '../ChristmasTips/TipsOverview';
import AddTip from '../ChristmasTips/AddTip';

function App() {
  return (
    <main className='App'>
      <header>
        <Nav />
      </header>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/recipes' component={Recipes} />
        <Route exact path='/tips' component={TipsOverview} />
        <Route exact path='/tips/add' component={AddTip} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
