import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TopNavigation from './components/navigation/TopNavigation';
import AboutPage from './components/pages/AboutPage';
import JoinPage from './components/pages/JoinPage';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import MessageSnackbar from './components/messages/MessageSnackbar';
import NotFoundPage from './components/pages/NotFoundPage';
import SinglePollPage from './components/pages/SinglePollPage';
import NewPollPage from './components/pages/NewPollPage';
import UserPollsPage from './components/pages/UserPollsPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(brands)

const App = ({ snackbarMessage }) => (
  <div className="App">
    <TopNavigation />
    {snackbarMessage.length > 0 && <MessageSnackbar message={snackbarMessage} />}
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <UserRoute
        exact
        path="/polls/new"
        component={NewPollPage}
      />
      <UserRoute
        exact
        path="/user/polls"
        component={UserPollsPage}
      />
      <Route exact path="/polls/:poll_id" component={SinglePollPage} />
      <GuestRoute
        exact
        path="/join"
        component={JoinPage}
      />
      <GuestRoute
        exact
        path="/login"
        component={LoginPage}
      />
      <Route path="/*" component={NotFoundPage} />
    </Switch>
  </div>
);

App.propTypes = {
  snackbarMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  snackbarMessage: state.snackbar,
});

export default connect(mapStateToProps)(App);
