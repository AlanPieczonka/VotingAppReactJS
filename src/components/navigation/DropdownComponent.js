import React, { Component } from 'react'
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import DropdownItem from './DropdownItem';
import { showSnack } from '../../actions/snackbar';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

class DropdownComponent extends Component {
	state = {
    anchorEl: null,
  };

  handleClick = event => this.setState({ anchorEl: event.currentTarget });
  handleClose = () => this.setState({ anchorEl: null });

	logoutAndShowSnack = () => {
    this.props.logout();
    showSnack('You have succesfully logged out!');
  };
	
  render() {
    const { userEmail, isAuthenticated } = this.props
		const { anchorEl } = this.state
		const links = [
			{name: "New Poll", to: "/polls/new", type: "private"},
			{name: "About", to: "/about", type: "public"},
			{name: "Join", to: "/join", type: "guest"},
			{name: "Login", to: "/login", type: "guest"},
			{name: "Logout", to: "/", type: "private"}
		]
    return (
      <div>
				<IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
					onClick={this.handleClick}
					color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
				<Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              width: 200,
            },
          }}
        >
					{userEmail && <DropdownItem link={{to: '/user/polls', name: userEmail}} handleClose={this.handleClose}/>}
          {links.map(link => {
						switch(link.type) {
							case "guest":
								return !isAuthenticated && (
									<DropdownItem key={link.name} link={link} handleClose={this.handleClose}/>
								)
							case "public":
								return (
									<DropdownItem key={link.name} link={link} handleClose={this.handleClose} onClick={this.logoutAndShowSnack}/>
								)
							case "private":
								return isAuthenticated && (
									<DropdownItem key={link.name} link={link} handleClose={this.handleClose}/>
								)
							default:
								return (
									<DropdownItem key={link.name} link={link} handleClose={this.handleClose}/>
								)
						}							
					})}
        </Menu>
      </div>
    )
  }
}

DropdownComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.token,
  userEmail: state.user.email,
});

export default connect(mapStateToProps, { logout, showSnack })(DropdownComponent);
