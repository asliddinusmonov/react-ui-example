import { compose, path, pathOr, length } from 'ramda'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { pure, defaultProps, setDisplayName, componentFromStream } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import TableSearch from './TableSearch'
import TablePagination from './TablePagination'
import {
  getIdsFromList,
  getSelectIdsFromRoute,
} from './helper'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
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
      padding: '2px 12px 2px 12px'
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
    },
  }
})

const enhance = compose(
  withStyles(styles),
  withRouter,
  defaultProps({
    defaultRowsPerPage: 10,
    withCheckbox: true,
    search: true,
  }),
  pure,
  setDisplayName('Table'),
)

const Table = componentFromStream(props$ => {
  return props$.combineLatest(({ classes, ...props }) => {
    const ids = getIdsFromList(props.list)
    const selectIds = getSelectIdsFromRoute(props.history)
    const idsCount = length(selectIds)
    const loading = path(['list', 'loading'], props)
    const count = pathOr(0, ['list', 'data', 'count'], props)

    return (
      <div className={classes.root}>
        {props.dialogs}
        <div className={classNames(classes.header, { [classes.select]: Boolean(idsCount) })}>
          <div>
            {props.search && <TableSearch />}

            {Boolean(idsCount) && props.search && (
              <div className={classes.selectCount} data-test="table-select-count">
                {idsCount} selected
              </div>
            )}
            <div className={classes.actions}>
              {props.actions}
            </div>
          </div>
        </div>
        {props.children.map((child, key) =>
          React.cloneElement(child, {
            ids,
            key,
            loading,
            withCheckbox: props.withCheckbox,
          })
        )}
        <div className={classes.footer}>
          <TablePagination
            count={count}
            defaultRowsPerPage={props.defaultRowsPerPage}
          />
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
  actions: PropTypes.node,
  list: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      count: PropTypes.number.isRequired,
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired
        })
      ).isRequired,
    }),
  }).isRequired,
  search: PropTypes.bool.isRequired,
  defaultRowsPerPage: PropTypes.number.isRequired,
  withCheckbox: PropTypes.bool
}

export default enhance(Table)
