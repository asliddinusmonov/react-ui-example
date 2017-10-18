import * as R from 'ramda'
import classNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import ownerDocument from 'dom-helpers/ownerDocument'
import contains from 'dom-helpers/query/contains'
import activeElement from 'dom-helpers/activeElement'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import IconButton from 'material-ui-next/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import addEventListener from '../../helpers/addEventListener'
import { appendParamsToUrl } from '../../helpers/urls'
import { getQueryValueFormRoute, getFullPathFromLocation } from '../../helpers/get'

export const TABLE_QUERY_KEY = 'tableDialog'

const styles = theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    visibility: 'hidden',
    transition: '0.8s',
    zIndex: '997',
    '& > div:first-child': {
      '&:focus': {
        backgroundColor: 'red'
      },
      '& > div:first-child': {
        position: 'fixed',
        background: '#fff',
        width: 400,
        boxShadow: theme.shadows[9]
      },
      position: 'absolute',
      zIndex: '999',
      top: 100,
      left: '50%',
      marginLeft: -200,
    },
    '& > div:last-child': {
      position: 'absolute',
      zIndex: '998',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }
  },

  active: {
    opacity: 1,
    visibility: 'visible',
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary['400'],
    lineHeight: '55px',
    color: theme.table.headerTextColor,
    boxShadow: theme.shadows[1],
    fontSize: '18px',
    paddingLeft: '10px',
    '& svg': {
      color: `${theme.table.headerIconColor} !important`
    }
  },

  content: {
    padding: '0 10px 10px 10px'
  }
})

class TableDialog extends React.Component {
  modal = null;
  onFocusListener = null;

  componentDidMount () {
    if (!this.onFocusListener) {
      const doc = ownerDocument(ReactDOM.findDOMNode(this))
      this.onFocusListener = addEventListener(doc, 'focus', this.handleFocusListener, true)
    }
  }

  componentWillUnmount () {
    if (this.onFocusListener) {
      this.onFocusListener.remove()
    }
  }

  handleFocusListener = () => {
    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)))
    const modalContent = this.modal && this.modal.lastChild

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus()
    }
  }

  onCloseFilter = (event) => {
    event.preventDefault()
    const { route: { push, location } } = this.props
    const fullPath = getFullPathFromLocation(location)

    return push(appendParamsToUrl({ [TABLE_QUERY_KEY]: null }, fullPath))
  }

  isOpen = () => {
    const { name, route } = this.props
    const tableQueryKey = getQueryValueFormRoute(TABLE_QUERY_KEY, route)

    return R.equals(name, tableQueryKey)
  }

  render () {
    const { classes, children, title } = this.props

    return (
      <div className={classNames(classes.root, { [classes.active]: this.isOpen() })}>
        <div ref={ref => { this.modal = ref }}>
          <div tabIndex="-1">
            <div className={classes.title}>
              {title}
              <IconButton onClick={this.onCloseFilter}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={classes.content}>
              {children}
            </div>
          </div>
        </div>
        <div onClick={this.onCloseFilter} />
      </div>
    )
  }
}

TableDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  route: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}

TableDialog.defaultProps = {
  name: 'filter'
}

export default compose(
  withStyles(styles),
  pure
)(TableDialog)
