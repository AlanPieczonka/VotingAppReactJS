import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import DropdownComponent from './DropdownComponent';

const TopNavigation = ({ classes }) => <div className={classes.root}>
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
          <DropdownComponent />
        </Toolbar>
      </AppBar>
    </div>

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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(TopNavigation);
