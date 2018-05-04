import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TopNavigation from './components/navigation/TopNavigation';
import AboutPage from './components/pages/AboutPage';
import JoinPage from './components/pages/JoinPage';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import MessageSnackbar from './components/messages/MessageSnackbar';
import NotFoundPage from './components/pages/NotFoundPage';

const App = ({ isGuest, snackbarMessage }) => (
  <div className="App">
    <TopNavigation />
    {snackbarMessage.length > 0 && <MessageSnackbar message={snackbarMessage} />}
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      {
        isGuest &&
        <Fragment>
          <Route exact path="/join" component={JoinPage} />
          <Route exact path="/login" component={LoginPage} />
        </Fragment>
      }
      <Route path="/*" component={NotFoundPage} />
    </Switch>
  </div>
);

App.propTypes = {
  isGuest: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isGuest: isEmpty(state.user),
  snackbarMessage: state.snackbar,
});

export default connect(mapStateToProps)(App);
