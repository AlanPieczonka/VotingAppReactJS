import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

// an email field (email validation)
// password field (password && password length validation)
// password confirmation field (password confirmation validation)
// <Join /> button
// Already a member? link

const submit = (e) => {
  e.preventDefault();
  console.log('Some fake submit action');
};


const JoinForm = (props = []) => (
  <div>
    <div style={{ border: '2px solid black', padding: '5%' }}>
      <h2 className="weight300">This is JoinForm</h2>
      <div>
        <form onSubmit={submit}>
        <div>
          <TextField
            id="email-input"
            label="Email"
            margin="normal"
            fullWidth
          />
        </div>
        <div>
        <TextField
          id="password-input"
          label="Password"
          type="password"
          margin="normal"
          fullWidth
        />
        </div>
        <div>
        <TextField
          id="password-confirmation-input"
          label="Password confirmation"
          type="password"
          margin="normal"
          fullWidth
        />
        </div>
          <Button type="submit" variant="raised" color="primary">
              Join
          </Button>
          <p><Link to="/login" className="link--black">Already a member?</Link></p>
        </form>
      </div>
    </div>
  </div>
);

export default JoinForm;
