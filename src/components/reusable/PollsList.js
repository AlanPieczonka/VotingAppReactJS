import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class PollsList extends Component {
        state = {
          polls: [],
          error: {},
        }
        componentDidMount() {
          const API = axios.create({
            baseURL: 'http://localhost:3000',
          });
          API.get(this.props.endpoint)
            .then(response => this.setState({ polls: response.data.polls }))
            .catch((error) => {
              if (error.response) {
                this.setState({ error: error.response.data.error.message });
              } else {
                this.setState({ error })
              }
            });
        }
        render() {
          const { classes, header } = this.props;
          const { error, polls } = this.state;
          const mappedPolls = this.state.polls.map(poll =>
            (<div key={poll._id}>
              <Link to={`/polls/${poll._id}`} style={{ textDecoration: 'none' }}>
                <Paper className={classes.root} elevation={4}>
                  <Typography variant="headline" component="h3">
                    {poll.title}
                  </Typography>
                </Paper>
              </Link>
            </div>));

          let pollContent = <CircularProgress color="secondary" />;

          if (Object.keys(error))
            pollContent = <h1>{error.message}</h1>
          if (polls.length > 0)
            pollContent = mappedPolls

          return (
            <div className={classes.root}>
              <h1>{header}</h1>
              {pollContent}
            </div>
          );
        }
}

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

export default withStyles(styles)(PollsList);
