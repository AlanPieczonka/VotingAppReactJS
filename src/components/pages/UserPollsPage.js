import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PollsList from '../reusable/PollsList';
import Grid from '@material-ui/core/Grid';

const UserPollsPage = ({ userEmail }) => (
  <Grid container justify="center">
    <Grid item xs={12} md={8}>
      <PollsList endpoint="/user/polls" header={`Hello, ${userEmail}`} />
    </Grid>
  </Grid>
);

const mapStateToProps = state => ({
  userEmail: state.user.email,
});

UserPollsPage.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserPollsPage);
