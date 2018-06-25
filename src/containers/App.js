import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import SearchOne from './SearchOne'
import SearchTwo from './SearchTwo'
import SearchThree from './SearchThree'
import PotentialMatchSearch from './PotentialMatchSearch'
import SearchAlgolia from './SearchAlgoliaTwo'

const App = () => (
  <Router>
    <div className="container">
      <nav className="ui secondary menu">
        <NavLink exact to="/search1" className="item">SearchOne</NavLink>
        <NavLink exact to="/search2" className="item">SearchTwo</NavLink>
        <NavLink exact to="/search3" className="item">SearchThree</NavLink>
        <NavLink exact to="/search4" className="item">PotentialMatchSearch</NavLink>
        <NavLink exact to="/search5" className="item">Algolia</NavLink>
      </nav>

      <Route exact path="/search1" component={SearchOne}/>
      <Route exact path="/search2" component={SearchTwo}/>
      <Route exact path="/search3" component={SearchThree}/>
      <Route exact path="/search4" component={PotentialMatchSearch}/>
      <Route exact path="/search5" component={SearchAlgolia}/>
    </div>
  </Router>
)

export default App;
