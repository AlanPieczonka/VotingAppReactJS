import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
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

function TopNavigation(props) {
  const { classes } = props;
  const { isLoggedIn } = props;
  const { logout } = props;
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
          <Link to="/about" className="link">
            <Button color="inherit">About</Button>
          </Link>
          {isLoggedIn ? (
            <Link to="/" className="link">
              <Button color="inherit" onClick={() => logout()}>Logout</Button>
            </Link>
          )
            : (
              <Fragment>
                <Link to="/join" className="link">
                  <Button color="inherit">Join</Button>
                </Link>
                <Link to="/login" className="link">
                  <Button color="inherit">Login</Button>
                </Link>
              </Fragment>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopNavigation.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: !isEmpty(state.user),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { logout }),
)(TopNavigation);
