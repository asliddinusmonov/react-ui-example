import { path, is, equals, curry } from 'ramda'
import { push } from 'react-router-redux'
import axios from 'axios'
import { API_URL } from '../constants/api'
import * as ROUTE from '../constants/routes'
import * as STATE from '../constants/state'
import toCamelCase from '../helpers/toCamelCase'

const INTERNAL_ERROR = 500
const CONTENT_TYPE_JSON = 'application/json'

const responseToCamelCase = (data, response) => {
  const responseContentType = path(['content-type'], response)

  if (equals(CONTENT_TYPE_JSON, responseContentType)) {
    return toCamelCase(JSON.parse(data))
  }

  if (is(Object, data) || is(Array, data)) {
    return toCamelCase(data)
  }

  return data
}

const apiErrorHandler = curry((push, error) => {
  const status = path(['response', 'status'], error)

  if (equals(INTERNAL_ERROR, status)) {
    push(ROUTE.INTERNAL_SERVER_ERROR)
  }

  return Promise.reject(error)
})

export default ({ getState, dispatch }) => {
  const state = getState()
  const token = path([STATE.SING_IN, 'data', 'token'], state)

  axios.defaults.baseURL = API_URL
  axios.defaults.transformResponse = [responseToCamelCase]

  axios.defaults.headers.common['Authorization'] = token && `Token ${token}`

  axios.interceptors.response.use(response => response, apiErrorHandler(dispatch(push)))

  return axios
}
