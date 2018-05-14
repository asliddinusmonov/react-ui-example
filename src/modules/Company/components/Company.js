import { path, prop } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import * as ROUTES from '../../../constants/routes'
import { getRouteFromProps } from '../../../helpers/get'
import AppBar from '../../../components/AppBar'
import CompanyDetail from './CompanyDetail'
import CompanyList from './CompanyList'

const Company = ({ list, filter, app, ...props }) => {
  const route = getRouteFromProps(props)

  const detail = {
    id: path(['detail', 'id'], props),
    detail: (
      <CompanyDetail route={route} detail={prop('detail', props)} />
    )
  }

  return (
    <AppBar active={ROUTES.COMPANY} {...app}>
      <CompanyList
        route={route}
        filter={filter}
        list={list}
        detail={detail}
      />
    </AppBar>
  )
}

Company.propTypes = {
  app: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
}

export default Company
