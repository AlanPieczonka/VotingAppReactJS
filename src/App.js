import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import About from './Components/routes/About';
import TopNavigation from './Components/navigation/TopNavigation';

const App = () => {
  return (
    <div className="App">
      <TopNavigation />
      <Route exact path="/about" component={About} />
    </div>
  );
}


export default App;
