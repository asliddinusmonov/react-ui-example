import _ from 'lodash'
import { compose, withHandlers, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import ResetPassword from '../components/ResetPassword'
import { openSnackbarAction, SUCCESS_TYPE } from '../../../components/withState/Snackbar/actions'
import { FORM } from '../components/ResetPasswordForm'
import {
  actions,
  RESET_PASSWORD_STATE_NAME
} from '../modules/resetPassword'

const mapStateToProps = (state) => ({
  loading: _.get(state, [RESET_PASSWORD_STATE_NAME, 'loading']),
  resetPassword: _.get(state, [RESET_PASSWORD_STATE_NAME, 'data']),
  formValues: _.get(state, ['form', FORM, 'values']),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, openSnackbarAction }),
  withPropsOnChange(['resetPassword'], (props) => {
    const message = _.get(props, ['resetPassword', 'message'])
    if (props.resetPassword) {
      props.openSnackbarAction({ action: SUCCESS_TYPE, message })
      browserHistory.push(ROUTE.SIGN_IN_URL)
    }
  }),
  withHandlers({
    onSubmit: props => () => {
      const code = _.get(props, ['params', 'code'])
      return props.resetPasswordAction(code, props.formValues)
    }
  })
)

export default enhance(ResetPassword)
