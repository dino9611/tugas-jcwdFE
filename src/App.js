import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Todo from "./pages/Todo/Todo";
import Recipe from './pages/Recipe/Recipe';
import "./App.css"

class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <div className="d-flex justify-content-between align-items-center bg-primary p-xl-4 p-md-4 p-3">
          <div className="textbold">React Jaki</div>
          <div className="menu">
            <Link to="/" className="a-color">Todo</Link>
            <Link to="/recipe" className="a2 a-color">Recipe</Link>
          </div>
        </div>

        <Switch>
          <Route path="/" exact component={Todo} />
          <Route path="/recipe" exact component={Recipe} />
        </Switch>
      </Router>
    )
  }
}

export default App