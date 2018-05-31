import React, { Component } from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import validate from '../../validation/NewPollValidation';
import CreateTextField from '../fields/CreateTextField';

class NewPollPage extends Component {
  state = {
    title: '',
    options: [
      { key: 0, title: 'At least' },
      { key: 1, title: '2 options' },
    ],
  }

  handleChange = name => event => this.setState({ [name]: event.target.value });

  _handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      const { options } = this.state;
      let lastKey;
      if (options.length > 0) {
        lastKey = options[options.length - 1].key;
      } else {
        lastKey = -1;
      }
      this.setState({
        options: [...options, { key: lastKey + 1, title: event.target.value }],
      });
      event.target.value = '';
      event.preventDefault();
    }
  }

  _handleDelete = data => () => {
    if (this.state.options.length === 2) {
      return;
    }
    const options = [...this.state.options];
    const optionToDelete = options.indexOf(data);
    options.splice(optionToDelete, 1);
    this.setState({ options });
  };

  _handleSubmit = (event) => {
    console.log(event);

    event.preventDefault();
    if (this.state.options.length < 2) {
      return;
    }
    const { title } = this.state;
    const options = this.state.options.map((option) => {
      delete option.key;
      return option;
    });
    const API = axios.create({
      baseURL: 'http://localhost:3000',
    });
    API.post('/polls', {
      poll: {
        title,
        options,
      },
    })
      .then(response => this.props.history.push(`/polls/${response.data.poll._id}`))
      .catch((error) => {
        console.log('There has been an error with creating new poll');
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{
        padding: '30px 50px',
      }}
      >
        <form onSubmit={this._handleSubmit}>
          <div>
            <Field
              required
              id="PollTitle"
              name="title"
              label="Title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Is the Nintendo Switch the best console ever?"
              fullWidth
              margin="normal"
              type="text"
              onChange={this.handleChange('title')}
              component={CreateTextField}
            />
          </div>
          <div>
            <TextField
              id="NewPollOption"
              label="New Option (click Enter)"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Yes!"
              fullWidth
              margin="normal"
              onKeyPress={this._handleKeyPress}
            />
          </div>
          {this.state.options.length > 0 &&
          <div style={{
            margin: '20px 0px',
          }}
          >
            <Paper className={classes.root}>
              {this.state.options.map(data => (
                <Chip
                  key={data.key}
                  label={data.title}
                  onDelete={this._handleDelete(data)}
                  className={classes.chip}
                />
              ))}
            </Paper>
          </div>
        }
          <Button type="submit" variant="raised" color="primary">
             Create
          </Button>
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit * 1.25,
  },
});

export default compose(
  reduxForm({
    form: 'NewPollPage',
    validate,
  }),
  withStyles(styles),
)(NewPollPage);
