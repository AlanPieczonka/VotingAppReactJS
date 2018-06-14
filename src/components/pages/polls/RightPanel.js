import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrashAlt';

export default ({ isAuthenticated, isAuthorized, newOption, handleChange }) => {
  return (
    <Grid item xs={12} sm={4} md={3} xl={2}>
      { isAuthenticated && (
          <Paper elevation={4}>
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
                  <FontAwesomeIcon 
                    icon={faPencil}
                    style={{marginRight: '6px'}}/>
                  Add new option
                </Button>
              </form>
            </div>
          </Paper>
      )}
      { isAuthenticated && (
          <Paper>
            <div style={{ width: '100%', color: 'white', backgroundColor: '#00BCD4', padding: '18px', marginTop: '18px', boxSizing: 'border-box', textAlign: 'left'}}>
              Social media
            </div>
            <div style={{ padding: '18px' }}>
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
            </div>
          </Paper>
        )
      }
      { isAuthorized && (
          <Paper elevation={4}>
            <div style={{ width: '100%', color: 'white', backgroundColor: '#F44336', padding: '18px', marginTop: '18px', boxSizing: 'border-box', textAlign: 'left'}}>
              Danger Zone
            </div>
            <div style={{ padding: '18px' }}>
                <Button onClick={this.deletePoll} type="button" variant="raised" size="small" color="secondary">
                  <FontAwesomeIcon 
                    icon={faTrash}
                    style={{marginRight: '6px'}}/>
                  Delete Poll
                </Button>
            </div>
          </Paper>
      )}
    </Grid>
  )
}
