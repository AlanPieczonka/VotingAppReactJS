import React, { Fragment } from 'react';
import PollsList from '../reusable/PollsList';

const UserPollsPage = () => (
  <Fragment>
    <PollsList endpoint="/user/polls" header="Your polls" />
  </Fragment>
);

export default UserPollsPage;
