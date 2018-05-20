import React, { Fragment } from 'react';
import PollsList from '../reusable/PollsList';

const HomePage = () => (
  <Fragment>
    <PollsList endpoint="/polls" header="All polls" />
  </Fragment>
);

export default HomePage;
