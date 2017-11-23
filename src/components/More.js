import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'

const More = ({ state, setState, children, ...props }) => (
  <div {...props}>
    <IconButton onClick={(event) => setState({ open: true, anchorEl: event.currentTarget })}>
      <MoreVertIcon />
    </IconButton>
    {React.cloneElement(children, { ...state, onRequestClose: () => setState({ open: false, anchorEl: null }) })}
  </div>
)

More.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired
}

export default withState('state', 'setState', { open: false, anchorEl: null })(More)
