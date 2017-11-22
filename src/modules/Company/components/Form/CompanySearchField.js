import { prop, path } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, getContext } from 'recompose'
import { MenuItem } from 'material-ui/Menu'
import axios from '../../../../helpers/axios'
import * as API from '../../../../constants/api'
import AutocompleteField from '../../../../components/Form/SmartFields/AutocompleteField'

const CompanySearchField = ({ ...props }) => {
  return (
    <AutocompleteField {...props} />
  )
}

CompanySearchField.propTypes = {
  getSuggestionByKeyword: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  getById: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired
}

export default compose(
  getContext({ store: PropTypes.object.isRequired }),
  withHandlers({
    getSuggestionByKeyword: ({ store }) => ([{ value }, cancelToken]) => {
      return axios(store)
        .get(`${API.API_URL}/companies/`, { cancelToken, params: { search: value } })
        .then(path(['data', 'results']))
        .catch(() => new Error('Request canceled'))
    },

    getSuggestionValue: props => (onChange, suggestion) => {
      const id = prop('id', suggestion)
      const name = prop('name', suggestion)
      onChange({ id, name })

      return prop('name', suggestion)
    },

    renderSuggestion: props => (suggestion) => {
      return (
        <MenuItem component="div">
          <div>{prop('name', suggestion)}</div>
        </MenuItem>
      )
    },

    getById: ({ store }) => (id) => {
      return axios(store)
        .get(`${API.API_URL}/companies/${id}/`)
        .then(path(['data']))
        .catch(() => new Error('Request failed'))
    },

    getValue: props => (value) => {
      return prop('name', value)
    }
  })
)(CompanySearchField)
