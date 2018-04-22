import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TopNavigation from './components/navigation/TopNavigation';
import AboutPage from './components/pages/AboutPage';
import JoinPage from './components/pages/JoinPage';

const App = () => {
  return (
    <div className="App">
      <TopNavigation />
      <Switch>
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/join" component={JoinPage} />
      </Switch>
    </div>
  );
}


export default App;
