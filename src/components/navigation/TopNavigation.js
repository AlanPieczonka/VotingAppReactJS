import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../actions/auth';
import { showSnack } from '../../actions/snackbar';

const TopNavigation = ({
  classes, isAuthenticated, userEmail, logout, showSnack,
}) => {
  const logoutAndShowSnack = () => {
    logout();
    showSnack('You have succesfully logged out!');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <Link to="/" className="link">
              <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
					  Voting App
          </Typography>
          {userEmail && <Link to="/user/polls" className="link"><Button color="inherit">{userEmail}</Button></Link>}
          {isAuthenticated &&
          <Link to="/polls/new" className="link">
            <Button color="inherit">New Poll</Button>
          </Link>
          }
          <Link to="/about" className="link">
            <Button color="inherit">About</Button>
          </Link>
          {!isAuthenticated ? (
            <Fragment>
              <Link to="/join" className="link">
                <Button color="inherit">Join</Button>
              </Link>
              <Link to="/login" className="link">
                <Button color="inherit">Login</Button>
              </Link>
            </Fragment>
            )
            : (
              <Link to="/" className="link">
                <Button color="inherit" onClick={() => logoutAndShowSnack()}>Logout</Button>
              </Link>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

TopNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.token,
  userEmail: state.user.email,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { logout, showSnack }),
)(TopNavigation);
