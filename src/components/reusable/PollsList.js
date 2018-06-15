import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import moment from 'moment';

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
                this.setState({
                  error: {
                    message: error.response.data.error.message,
                  },
                });
              } else {
                this.setState({ error });
              }
            });
        }

        formatDate = date => moment(`${date.slice(0, 10)}, ${date.slice(11, 19)}`, 'YYYY-MM-DD, h:mm:ss').fromNow()

        render() {
          const { classes, header } = this.props;
          const { error, polls } = this.state;
          const mappedPolls = polls.map(poll =>
            (<div key={poll._id}>
              <Link to={`/polls/${poll._id}`} style={{ textDecoration: 'none' }}>
                <Paper className={classes.root} elevation={4}>
                  <Typography variant="headline" component="h3">
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ marginRight: '12px' }}
                    />
                    {poll.title}
                  </Typography>
                  <Typography>
                    {this.formatDate(poll.createdAt)}
                  </Typography>
                </Paper>
              </Link>
             </div>));

          let pollContent = <CircularProgress color="secondary" className={classes.progress} />;

          if (Object.keys(error)) {
            pollContent = (
              <Typography variant="subheading" gutterBottom>
                {error.message}
              </Typography>);
          }
          if (polls.length > 0) { pollContent = mappedPolls; }

          return (
            <div className={classes.root}>
              <Typography variant="title" gutterBottom>
                {header}
              </Typography>
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
  progress: theme.mixins.gutters({
    paddingTop: 40,
    marginTop: 10,
  }),
});

export default withStyles(styles)(PollsList);
