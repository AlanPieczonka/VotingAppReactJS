import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RightPanel from './polls/RightPanel';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class SinglePollPage extends Component {
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
    const { isAuthorized, newOption, optionToVote } = this.state;
    const {
      title, options,
    } = this.state.poll;
    const { isAuthenticated } = this.props;
    let optionsDiv;
    if (options) {
      optionsDiv = (
        <FormControl>
          <InputLabel htmlFor="option-helper">Option</InputLabel>
          <Select
            value={optionToVote}
            onChange={this.handleSelect}
            input={<Input name="optionToVote" id="option-helper" />} 
          >
            {options.map((option, i) => (
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
      chart = <Pie data={prepareChart(options)} />;
    } else {
      chart = <CircularProgress color="secondary" />;
    }
    return (
      <div style={{ padding: '18px' }}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} sm={8}>
            <Paper elevation={4}>
              <div style={{ width: '100%', color: 'white', backgroundColor: '#2196F3', padding: '16px', boxSizing: 'border-box', textAlign: 'left'}}>
                <Typography variant="headline" color="inherit" noWrap>
                  {title}
                </Typography>
              </div>
              {chart}
              <div style={{ padding: '24px' }}>
                {optionsDiv}
                <div style={{ marginTop: '20px' }}>
                  <Button onClick={this.vote} variant="raised" size="small" color="primary">
                    Vote
                  </Button>
                </div>
              </div>
            </Paper>
            { isAuthenticated && (
                <Paper style={{marginTop: '16px', padding: '16px'}}>
                  <Button 
                  onClick={this.shareOnTwitter} 
                  variant="raised" 
                  size="small"
                  color="primary"
                  style={{backgroundColor: 'rgb(8,160,233)'}}
                  >
                    <FontAwesomeIcon 
                    icon={['fab', 'twitter']} 
                    style={{marginRight: '6px'}}/>
                    Share on Twitter
                  </Button>
                </Paper>
              )
            }
          </Grid>
          { 
            (isAuthorized || isAuthenticated) 
            &&
            <RightPanel 
              isAuthenticated={isAuthenticated}
              isAuthorized={isAuthorized}
              handleChange={this.handleChange}
              newOption={newOption}
            />
          }
        </Grid>
      </div>
    );
  }
}

SinglePollPage.propTypes = {
  currentUserId: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      poll_id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currentUserId: state.user.id,
  isAuthenticated: !!state.user.token,
});

export default connect(mapStateToProps)(SinglePollPage);