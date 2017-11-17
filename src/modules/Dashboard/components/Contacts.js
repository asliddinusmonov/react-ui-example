import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import Card, { CardHeader, CardActions } from 'material-ui-next/Card'
import withStyles from 'material-ui-next/styles/withStyles'
import IconButton from 'material-ui-next/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import SortByAlpha from 'material-ui-icons/SortByAlpha'
import PersonAdd from 'material-ui-icons/PersonAdd'
import Close from 'material-ui-icons/Close'
import { CircularProgress } from 'material-ui-next/Progress'
import Avatar from 'material-ui-next/Avatar'
import Button from 'material-ui-next/Button'
import avatar from '../../../components/assets/photo.jpg'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui-next/List'
import AddContactDialog from './ContactDialog/ContactDialog'

const styles = theme => ({
  card: {
    minWidth: 345,
    display: 'inline-block',
    marginLeft: 30,
    verticalAlign: 'top'
  },
  cardHeader: {
    background: theme.palette.primary[400],
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    color: theme.contacts.textColor,
    fontSize: 14
  },
  icon: {
    width: 30
  },
  searchIcon: {
    color: `${theme.contacts.textColor} !important`,
  },
  sortByAlpha: {
    color: `${theme.contacts.textColor} !important`,
  },
  cardActions: {
    borderTop: '1px solid rgba(215,225,237,.6)',
    justifyContent: 'center',
    position: 'relative',
    '& button': {
      color: '#688696'
    }
  },
  addPerson: {
    position: 'absolute',
    right: 15,
    top: -18,
    backgroundColor: theme.palette.secondary[400],
    '&:hover': {
      backgroundColor: theme.palette.secondary[500],
    },
    '& svg': {
      color: `${theme.contacts.textColor} !important`
    }
  },
  loadingCover: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 0'
  },
  loading: {
    color: theme.palette.secondary[400]
  },
  search: {
    minHeight: 56,
    position: 'relative',
    '& input': {
      border: 'none',
      textIndent: 45,
      paddingRight: 50,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      outline: 'none',
      width: '100%',
      background: theme.palette.primary[50],
      color: '#75849b',
      transition: '0.5s',
      boxSizing: 'border-box',
      '&::placeholder': {
        color: '#75849b'
      },
      '&:focus': {
        background: theme.palette.primary[100],
      }
    },
    '& button': {
      position: 'absolute',
      top: '50%',
      marginTop: -24,
      right: 5
    }
  }
})

const Contacts = ({ classes, alt, list, loading, ...defaultProps }) => {
  const map = R.addIndex(R.map)
  const { state, onChange, openSearch, closeSearch, openDialog, closeDialog } = defaultProps

  return (
    <div className={classes.card}>
      <Card>
        {state.search ? (
          <div className={classes.search}>
            <input placeholder="Search and press enter..." onChange={onChange} />
            <IconButton onClick={closeSearch}>
              <Close />
            </IconButton>
          </div>
        ) : (
          <div className={classes.cardHeader}>
            <CardHeader
              title="Contacts"
              classes={{ title: classes.title }}
            />
            <CardActions>
              <IconButton onClick={openSearch} className={classes.icon}>
                <SearchIcon className={classes.searchIcon} />
              </IconButton>
              <IconButton className={classes.icon}>
                <SortByAlpha className={classes.sortByAlpha} />
              </IconButton>
            </CardActions>
          </div>
        )}
        <div>
          {loading ? (
            <div className={classes.loadingCover}>
              <CircularProgress size={50} className={classes.loading} />
            </div>
          ) : (
            <List>
              {map((item, index) => (
                <ListItem key={index} button={true}>
                  <ListItemAvatar>
                    <Avatar
                      alt={alt}
                      src={avatar}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={R.prop('name', item)}
                    secondary={R.prop('email', item)}
                  />
                </ListItem>
              ), list)}
            </List>
          )}
        </div>
        <CardActions className={classes.cardActions}>
          <Button>view more</Button>
          <Button fab={true} className={classes.addPerson} onClick={openDialog}>
            <PersonAdd />
          </Button>
        </CardActions>
      </Card>
      <AddContactDialog open={state.dialog} close={closeDialog} />
    </div>
  )
}

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default compose(
  withState('state', 'setState', {
    search: false,
    value: '',
    dialog: true
  }),
  withHandlers({
    onChange: ({ state, setState }) => (event) => {
      setState({ ...state, value: event.target.value })
    },
    openSearch: ({ state, setState }) => () => {
      setState({ ...state, search: true })
    },
    closeSearch: ({ state, setState }) => () => {
      setState({ ...state, search: false })
    },
    openDialog: ({ state, setState }) => () => {
      setState({ ...state, dialog: true })
    },
    closeDialog: ({ state, setState }) => () => {
      setState({ ...state, dialog: false })
    }
  }),
  withStyles(styles)
)(Contacts)
