import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Home from './components/Home';
import Upload from './components/Upload';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to='/'>Home</Link>
        <br />
        <Link to='/upload'>Upload a Picture</Link>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/upload' component={Upload} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
