import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import Menu, { MenuItem } from 'material-ui/Menu'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import FilterListIcon from 'material-ui-icons/FilterList'
import More from '../../../components/More'
import ExcelIcon from '../../../components/Icon/ExcelIcon'
import PdfIcon from '../../../components/Icon/PdfIcon'

const styles = theme => ({
  root: {
    display: 'inline-flex'
  },
  menu: {
    '& svg': {
      marginRight: 10,
      color: theme.palette.secondary[500]
    }
  }
})

const CompanyListActions = ({ classes, onOpenFilter, filterCount, ...props }) => (
  <div className={classes.root}>
    <IconButton onClick={onOpenFilter}>
      <Badge badgeContent={filterCount} color="accent">
        <FilterListIcon />
      </Badge>
    </IconButton>
    <More>
      <Menu className={classes.menu}>
        <MenuItem onClick={() => console.log('Work')}>
          <PdfIcon />  Download PDF format
        </MenuItem>
        <MenuItem onClick={() => console.log('Work')}>
          <ExcelIcon />  Download CSV format
        </MenuItem>
      </Menu>
    </More>
  </div>
)

CompanyListActions.propTypes = {
  classes: PropTypes.object.isRequired,
  filterCount: PropTypes.number.isRequired,
  onOpenFilter: PropTypes.func.isRequired
}

export default withStyles(styles)(CompanyListActions)
