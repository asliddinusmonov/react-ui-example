import { compose, path, pathOr, prop, length } from 'ramda'
import React from 'react'
import { pure, mapProps, withHandlers, defaultProps, componentFromStream } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import { getFullPathFromLocation } from '../../helpers/get'
import { addItemToSelect, removeItemFromSelect } from '../../helpers/urls'
import TableSearch from '../Table/TableSearch'
import TablePagination from './TablePagination'
import {
  getIdsFromList,
  getSelectIdsFromRoute,
} from './helper'

const styles = theme => ({
  root: {
    width: '100%',
    '& > div:first-child': {
      marginLeft: '10px',
      marginRight: '10px',
      position: 'relative'
    }
  },

  loader: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 400,
    alignItems: 'center',
    background: theme.table.backgroundColor,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.14),' +
      '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  },

  header: {
    paddingTop: 1,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    transition: '1s',
    background: theme.palette.primary['400'],
    '& svg': {
      color: `${theme.table.headerIconColor} !important`
    },
    '& > div:first-child': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px 12px 0 12px'
    },
  },

  select: {
    background: theme.palette.secondary['400'],
  },

  selectCount: {
    color: theme.table.headerTextColor
  },

  actions: {
    minHeight: 48,
    minWidth: 280,
    display: 'inline-flex',
    justifyContent: 'flex-end'
  },

  body: {
    display: 'flex',
    flexDirection: 'column'
  },

  footer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: theme.table.backgroundColor,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    '& td': {
      border: 'none !important'
    }
  },

  empty: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
      '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    background: '#fff',
    height: 400,
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    '& img': {
      width: '25%',
      margin: '0 60px'
    },
    '& h4': {
      margin: '0 0 10px',
      fontSize: '1.5em',
      textAlign: 'center'
    }
  },

  hide: {
    minHeight: 0,
    maxHeight: 0,
    height: 0,
    visibility: 'hidden'
  }
})

const enhance = compose(
  withStyles(styles),
  defaultProps({
    getById: path(['id']),
    defaultRowsPerPage: 10,
    withCheckbox: true,
    search: true,
  }),
  withHandlers({
    onCheckAll: ({ getById, history, list }) => () => {
      const { push, location } = history
      const listIds = getIdsFromList(getById, list)
      const fullPath = getFullPathFromLocation(location)

      return push(addItemToSelect(fullPath, 'select', listIds))
    },
    onUnCheckAll: ({ getById, history, list }) => () => {
      const { push, location } = history
      const listIds = getIdsFromList(getById, list)
      const fullPath = getFullPathFromLocation(location)

      return push(removeItemFromSelect(fullPath, 'select', listIds))
    },
    onCheckItem: ({ history }) => (isChecked, id) => {
      const { push, location } = history
      const fullPath = getFullPathFromLocation(location)

      if (isChecked) {
        return push(addItemToSelect(fullPath, 'select', id))
      }

      return push(removeItemFromSelect(fullPath, 'select', id))
    }
  }),
  mapProps((props) => {
    const {
      classes,
      route,
      list,
      actions,
      dialogs,
      defaultRowsPerPage,
      search,
      children,
      withCheckbox
    } = props

    const loading = prop('loading', list)
    const count = pathOr(0, ['data', 'count'], list)
    const selectIds = getSelectIdsFromRoute(route)
    const idsCount = length(selectIds)
    return {
      classes,
      route,
      count,
      loading,
      dialogs,
      actions,
      list,
      defaultRowsPerPage,
      idsCount,
      search,
      children,
      withCheckbox
    }
  }),
  pure
)

const Table = componentFromStream(props$ => {
  return props$.combineLatest(({ classes, ...props }) => {
    const ids = getIdsFromList(props.list)

    return (
      <div className={classes.root}>
        <div>
          {props.dialogs}
          <div className={classNames(classes.header, { [classes.select]: Boolean(props.idsCount) })}>
            <div>
              {props.search && <TableSearch />}

              {Boolean(props.idsCount) && props.search && (
                <div className={classes.selectCount} data-test="table-select-count">
                  {props.idsCount} selected
                </div>
              )}
              <div className={classes.actions}>
                {props.actions}
              </div>
            </div>
          </div>
          {props.children.map((child) =>
            React.cloneElement(child, {
              ids,
              loading: props.loading,
              withCheckbox: props.withCheckbox
            })
          )}
          <div className={classes.footer}>
            <TablePagination
              count={props.count}
              defaultRowsPerPage={props.defaultRowsPerPage}
            />
          </div>
        </div>
      </div>
    )
  })
})

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  route: PropTypes.object.isRequired,
  actions: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  search: PropTypes.bool.isRequired,
  empty: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  idsCount: PropTypes.number.isRequired,
  defaultRowsPerPage: PropTypes.number.isRequired,
  withCheckbox: PropTypes.bool
}

export default enhance(Table)
