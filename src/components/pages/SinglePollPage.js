import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Pie } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import prepareChart from './../../utils/prepareChart';

class SinglePoll extends Component {
  state = {
    poll: {},
    isAuthorized: false,
    newOption: '',
    optionToVote: '',
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
        this.setState({ optionToVote: poll.options[0]._id });
        if (poll.userId === currentUserId) {
          this.setState({ isAuthorized: true });
        }
      })
      .catch((error) => {
        if (error.response.statusText === 'Not Found') {
          this.props.history.push('/not-found');
        }
      });
  }

  handleChange = name => event => this.setState({ [name]: event.target.value });

  handleSelect = event => this.setState({ [event.target.name]: event.target.value });

  shareOnTwitter = () => {
    window.open('https://twitter.com/intent/tweet?text=Hey, check out this cool poll!!!', '_blank');
  }

  vote = () => {
    const API = axios.create({
      baseURL: 'http://localhost:3000',
    });
    API.patch(`polls/${this.state.poll._id}/${this.state.optionToVote}/up`)
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
      title, options,
    } = this.state.poll;
    const { isAuthenticated } = this.props;
    let optionsDiv;
    if (this.state.poll.options) {
      optionsDiv = (
        <FormControl>
          <InputLabel htmlFor="option-helper">Option</InputLabel>
          <Select
            value={this.state.optionToVote}
            onChange={this.handleSelect}
            input={<Input name="optionToVote" id="option-helper" />}
          >
            {this.state.poll.options.map((option, i) => (
              <MenuItem key={option._id} value={option._id}>{option.title}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Option you want to vote on</FormHelperText>
        </FormControl>
      );
    } else {
      optionsDiv = <CircularProgress style={{ color: purple[500] }} thickness={7} />;
    }
    let chart;
    if (options) {
      chart = <Pie data={prepareChart(this.state.poll.options)} />;
    } else {
      chart = <CircularProgress color="secondary" />;
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
        <div style={{ marginTop: '20px' }}>
          <Button onClick={this.vote} variant="raised" size="small" color="primary">
              Vote
          </Button>
        </div>
        {
            isAuthenticated && (
              <Fragment>
                <Button onClick={this.shareOnTwitter} variant="raised" size="small" color="primary" style={{ marginTop: '10px' }}>
                        Share on Twitter
                </Button>
                <form onSubmit={this.addNewOption} style={{ marginTop: '-5px' }}>
                  <TextField
                    id="new-option"
                    label="New option"
                    margin="normal"
                    value={this.state.newOption}
                    onChange={this.handleChange('newOption')}
                  />
                  <br />
                  <Button type="submit" variant="raised" size="small" color="primary">
                  Add new option
                  </Button>
                </form>
              </Fragment>
            )
          }
        {isAuthorized && (
        <Fragment>
          <hr />
          <Button style={{ marginBottom: '10px' }} onClick={this.deletePoll} type="button" variant="raised" size="small" color="secondary">
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
