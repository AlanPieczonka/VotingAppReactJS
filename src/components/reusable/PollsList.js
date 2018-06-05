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
          errorMessage: null,
        }
        componentDidMount() {
          const API = axios.create({
            baseURL: 'http://localhost:3000',
          });
          API.get(this.props.endpoint)
            .then(response => this.setState({ polls: response.data.polls }))
            .catch((error) => {
              if (error.response.data.error.message) {
                this.setState({ errorMessage: error.response.data.error.message });
              } else {
                this.setState({ errorMessage: 'There has been an error ' });
              }
            });
        }
        render() {
          const { classes, header } = this.props;
          const { errorMessage } = this.state;
          const polls = this.state.polls.map(poll =>
            (<div key={poll._id}>
              <Link to={`/polls/${poll._id}`} style={{ textDecoration: 'none' }}>
                <Paper className={classes.root} elevation={4}>
                  <Typography variant="headline" component="h3">
                    {poll.title}
                  </Typography>
                </Paper>
              </Link>
            </div>));
          return (
            <div className={classes.root}>
              <h1>{header}</h1>
            {
              (() => {
                  if (errorMessage !== null)
                      return <h1>{errorMessage}</h1>
                  if (polls.length > 0)
                      return {polls}
                  else 
                      return <CircularProgress color="secondary" />
              })()
            }
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
