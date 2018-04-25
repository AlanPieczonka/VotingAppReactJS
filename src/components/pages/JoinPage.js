import React, { Component } from 'react';
import JoinForm from '../forms/JoinForm';

export default class JoinPage extends Component {
  submit(e) {
    e.preventDefault();
    console.log('Submit action');
  }
  render() {
    return (
      <div>
        <h1 className="weight300">JoinPage</h1>
        <JoinForm submit={this.submit} />
      </div>
    );
  }
}
