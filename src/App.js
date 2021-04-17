import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';

const App = () => {
  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
        <div className="nav-links">
          <Link to="/">
            <button className="home-button">Home</button>
          </Link>
          <Link to="/pizza">
            <button className="form-button">Order Here</button>
          </Link>
        </div>
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pizza" component={Form} />
      </Switch>
    </>
  );
};
export default App;
