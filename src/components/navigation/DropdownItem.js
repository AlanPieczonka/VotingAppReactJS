import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const style = {
  textDecoration: "none",
  color: "inherit",
  outline: "none"
}

const DropdownItem = ({link, onClick = (() => {}), handleClose }) => (
  <Link to={link.to} style={style} onClick={() => {
    handleClose()
    onClick()
  }}>
    <MenuItem>
      {link.name}
    </MenuItem>
  </Link>
)

DropdownItem.propTypes = {
  link: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
}

export default DropdownItem
