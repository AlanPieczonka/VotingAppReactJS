import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from '@material-ui/core/TextField';

class SinglePoll extends React.Component {
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
    let options;
    if (this.state.poll.options) {
      options = this.state.poll.options.map((option, i) =>
        (<div key={option._id}>
          <h2>Option: {option.title} Votes: {option.votes}</h2>
          <button onClick={() => this.vote(option._id)}>Vote</button>
        </div>));
    } else {
      options = <h1>Working</h1>;
    }
    const { isAuthorized } = this.state;
    const { title, userId, _id } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <div>
        <h1 className="weight300">Single Poll</h1>
        <h3>Poll ID: {this.props.match.params.poll_id}</h3>
        <h4>Poll ID from state: {_id}</h4>
        <h5>Title: {title}</h5>
        <h5>UserID: {userId}</h5>
        {options}
        <h5>After options</h5>
        <button>Share on Twitter</button>
        {isAuthorized && (
          <Fragment>
            <h1>This is your poll, do you want to delete?</h1>
            <Button onClick={() => this.deletePoll()} type="button" variant="raised" color="secondary">
              Delete
            </Button>
          </Fragment>
        )}
        {
          isAuthenticated && (
            <Fragment>
              <hr />
              <h1>Add new option</h1>
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
            </Fragment>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.id,
  isAuthenticated: !!state.user.token,
});

export default connect(mapStateToProps)(SinglePoll);
