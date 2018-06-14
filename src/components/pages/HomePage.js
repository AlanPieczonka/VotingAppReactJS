import React from 'react';
import PollsList from '../reusable/PollsList';
import Grid from '@material-ui/core/Grid';

const HomePage = () => (
  <Grid container justify="center">
    <Grid item xs={12} md={8}>
      <PollsList endpoint="/polls" header="All polls" />
    </Grid>
  </Grid>
);

export default HomePage;
