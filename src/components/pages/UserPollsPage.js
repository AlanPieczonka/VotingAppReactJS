import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PollsList from '../reusable/PollsList';

const UserPollsPage = ({ userEmail }) => (
  <Fragment>
    <PollsList endpoint="/user/polls" header={userEmail} />
  </Fragment>
);

const mapStateToProps = state => ({
  userEmail: state.user.email,
});

UserPollsPage.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserPollsPage);
