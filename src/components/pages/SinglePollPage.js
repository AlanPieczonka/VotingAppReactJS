import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import Button from 'material-ui/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Pie } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

class SinglePoll extends Component {
  state = {
    poll: {},
    isAuthorized: false,
    newOption: '',
  }

  componentDidMount() {
    const { currentUserId } = this.props;
    const { poll_id } = this.props.match.params;
    const API = axios.create({
      baseURL: 'http://localhost:3000',
    });
    API.get(`/polls/${poll_id}`)
      .then((response) => {
        const poll = response.data[0];
        this.setState({ poll });
        if (poll.userId === currentUserId) {
          this.setState({ isAuthorized: true });
        }
        console.log(poll);
      });
  }

  handleChange = name => event => this.setState({ [name]: event.target.value });

  vote = (id) => {
    const API = axios.create({
      baseURL: 'http://localhost:3000',
    });
    API.patch(`polls/${this.state.poll._id}/${id}/up`)
      .then(response => this.setState({ poll: response.data.poll }))
      .catch(error => console.error('There has been an error with voting', error));
  }

  deletePoll = () => {
    const API = axios.create({
      baseURL: 'http://localhost:3000',
    });
    API.delete(`/polls/${this.state.poll._id}`).then(() => this.props.history.push('/'));
  }

  addNewOption = () => {
    const { newOption } = this.state;
    if (newOption.length > 0) {
      const API = axios.create({
        baseURL: 'http://localhost:3000',
      });
      API.post(`/polls/${this.state.poll._id}/option`, {
        newOption: {
          title: newOption,
        },
      })
        .then(response => this.setState({ poll: response.data.poll }))
        .then(() => this.setState({ newOption: '' }))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const { isAuthorized } = this.state;
    const {
      title, userId, _id, options,
    } = this.state.poll;
    const { isAuthenticated } = this.props;
    let chart;

    let optionsDiv;
    if (this.state.poll.options) {
      optionsDiv = this.state.poll.options.map((option, i) =>
        (<div key={option._id}>
          <h2>Option: {option.title} Votes: {option.votes}</h2>
          <button onClick={() => this.vote(option._id)}>Vote</button>
         </div>));
    } else {
      optionsDiv = <h1>Working</h1>;
    }

    if (options) {
      // const chart = prepareChart(this.state.poll.options);
      const labels = options.map(option => option.title);
      const votes = options.map(option => option.votes);
      const backgroundColor = ['#FF6384',
        '#36A2EB',
        '#FFCE56'];
      const hoverBackgroundColor = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ];
      const data = {
        labels,
        datasets: [{
          data: votes,
          backgroundColor,
          hoverBackgroundColor,
        }],
      };
      chart = <Pie data={data} />;
    } else {
      chart = <h1>Preparing your chart...</h1>;
    }
    return (
      <div style={{ marginTop: '10px' }}>
        <Typography variant="title" gutterBottom>
          {title}
        </Typography>
        <div>
          {chart}
        </div>
        {optionsDiv}
        {
          isAuthenticated && (
            <Fragment>
              <Typography variant="title" gutterBottom>
          Add new option
              </Typography>
              <form onSubmit={this.addNewOption}>
                <TextField
                  id="new-option"
                  label="New option"
                  margin="normal"
                  value={this.state.newOption}
                  onChange={this.handleChange('newOption')}
                />
                <button type="submit">Add new option</button>
              </form>
              <Button variant="raised" size="small" color="primary">
                      Share on Twitter
              </Button>
            </Fragment>
          )
        }
        {isAuthorized && (
          <Fragment>
            <Button onClick={() => this.deletePoll()} type="button" variant="raised" size="small" color="secondary">
              Delete
            </Button>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.id,
  isAuthenticated: !!state.user.token,
});

export default connect(mapStateToProps)(SinglePoll);
