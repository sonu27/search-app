import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import SearchOne from './SearchOne'
import SearchTwo from './SearchTwo'

const App = () => (
  <Router>
    <div className="container">
      <nav className="ui secondary menu">
        <NavLink exact to="/" className="item">SearchOne</NavLink>
        <NavLink exact to="/search2" className="item">SearchTwo</NavLink>
      </nav>

      <Route exact path="/" component={SearchOne}/>
      <Route exact path="/search2" component={SearchTwo}/>
    </div>
  </Router>
)

export default App;
