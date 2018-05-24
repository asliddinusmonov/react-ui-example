import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Collapse from '@material-ui/core/Collapse'

const styles = theme => ({
  root: {
    backgroundColor: theme.components.table.contentBgColor
  },

  progress: {
    height: 2
  },

  collapse: {
    height: 0
  },

  collapseOpen: {
    height: 'auto',
  },

  entered: {
    overflow: 'visible'
  }
})

const TableContent = ({ classes, ...props }) => {
  const open = !props.loading

  return (
    <div className={classes.root}>
      {props.loading && <LinearProgress className={classes.progress} />}
      <Collapse
        in={open}
        classes={{
          entered: classes.entered,
          wrapper: classNames(
            classes.collapse, {
              [classes.collapseOpen]: open
            })
        }}>
        <div>
          <div className={classes.content}>
            {open && props.children}
          </div>
        </div>
      </Collapse>
    </div>
  )
}

TableContent.defaultProps = {
  columnSize: 1
}

TableContent.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
}

export default withStyles(styles)(TableContent)
