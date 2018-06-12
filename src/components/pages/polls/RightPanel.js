import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default ({ isAuthenticated, isAuthorized, newOption, handleChange }) => {
  return (
    <Grid item xs={12} sm={4} md={3} xl={2}>
      { isAuthenticated && (
          <Paper elevation={4}>
            <Fragment>
              <div style={{ width: '100%', color: 'white', backgroundColor: '#2196F3', padding: '16px', boxSizing: 'border-box', textAlign: 'left'}}>
                Missing options?
              </div>
              <div style={{ padding: '0 16px 32px 16px' }}>
                <form onSubmit={this.addNewOption}>
                  <TextField
                    id="new-option"
                    label="New option"
                    margin="normal"
                    value={newOption}
                    onChange={handleChange('newOption')}
                  />
                  <br />
                  <Button type="submit" variant="raised" size="small" color="primary">
                    Add new option
                  </Button>
                </form>
              </div>
            </Fragment>
          </Paper>
      )}
      { isAuthorized && (
          <Paper elevation={4}>
            <Fragment>
              <div style={{ width: '100%', color: 'white', backgroundColor: '#F44336', padding: '18px', marginTop: '18px', boxSizing: 'border-box', textAlign: 'left'}}>
                Danger Zone
              </div>
              <div style={{ padding: '18px' }}>
                  <Button onClick={this.deletePoll} type="button" variant="raised" size="small" color="secondary">
                      Delete Poll
                  </Button>
              </div>
            </Fragment>
          </Paper>
      )}
    </Grid>
  )
}
