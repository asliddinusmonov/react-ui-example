import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui-next/List'
import ListSubheader from 'material-ui-next/List/ListSubheader'
import withStyles from 'material-ui-next/styles/withStyles'
import MenuListItem from '../Menu/MenuListItem'

const styles = theme => ({
})

const MenuList = ({ route, classes, menuList, activeMenuName }) => (
  <List subheader={<ListSubheader>Navigation</ListSubheader>}>
    {R.addIndex(R.map)((item, index) => (
      <MenuListItem
        key={index}
        item={item}
        route={route}
        isRoot={true}
        activeMenuName={activeMenuName}
      />
    ), menuList)}
  </List>
)

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
  activeMenuName: PropTypes.string.isRequired
}

export default withStyles(styles)(MenuList)
