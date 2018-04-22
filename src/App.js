import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './Components/routes/About';
import TopNavigation from './Components/navigation/TopNavigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNavigation />
        <Route exact path="/about" component={About} />
      </div>
    );
  }
}

export default App;
