import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to='/'>Home</Link>
        <br />
        <Link to='/register'>Signup</Link>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
