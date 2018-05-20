import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class PollsList extends React.Component {
        state = {
          polls: [],
        }
        componentDidMount() {
          const API = axios.create({
            baseURL: 'http://localhost:3000',
          });
          API.get(this.props.endpoint).then(response => this.setState({ polls: response.data.polls }));
        }
        render() {
          const { classes, endpoint, header } = this.props;
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
              <List component="nav">
                {polls}
              </List>
            </div>
          );
        }
}

export default withStyles(styles)(PollsList);
