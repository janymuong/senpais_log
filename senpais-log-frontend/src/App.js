import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Anime from './pages/Anime';
import AnimeDetail from './components/AnimeDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/anime/:id" component={AnimeDetail} />
        <Route path="/anime" component={Anime} />
        {/* Add other routes here... */}
      </Switch>
    </Router>
  );
}

export default App;
