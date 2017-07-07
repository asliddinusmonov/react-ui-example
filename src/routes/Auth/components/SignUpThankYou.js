import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { compose, branch, renderNothing } from 'recompose'
import * as ROUTE from '../../../constants/routes'
import AuthLayout, { styles as wrapStyle } from '../components/AuthLayout'

const styles = {
  title: wrapStyle.title,
  footer: wrapStyle.footer,
  center: {
    textAlign: 'center'
  },
  action: {
    cursor: 'pointer',
  }
}

export const SignUpThankYou = ({ classes, loading, resend, email, firstName }) => (
  <AuthLayout
    title={`Thank you ${firstName}`}
    loading={loading}>
    <div>
      <p className={classes.center}>We've sent an email to { email }</p>

      <p className={classes.center}>Please click the link in that message to active your account</p>

      <p className={classes.center}>
        <Link className={classes.action} onTouchTap={resend}>Resend the message</Link>
        {' or '}
        <Link to={ROUTE.SIGN_UP_URL}>Change your email</Link>
      </p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTE.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

SignUpThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  resend: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired
}

const enhance = compose(
  injectSheet(styles),
  (render =>
      branch(render, renderNothing)
  )(props => !_.get(props, 'email')),
)

export default enhance(SignUpThankYou)
