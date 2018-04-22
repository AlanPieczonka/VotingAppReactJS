import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AboutPage from './Components/pages/AboutPage';
import TopNavigation from './Components/navigation/TopNavigation';

const App = () => {
  return (
    <div className="App">
      <TopNavigation />
      <Route exact path="/about" component={AboutPage} />
    </div>
  );
}


export default App;
