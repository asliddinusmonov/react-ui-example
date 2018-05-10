import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, mapPropsStream } from 'recompose'
import { push } from 'react-router-redux'
import { path, prop } from 'ramda'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import { getToken, clearToken } from '../../../helpers/token'
import { setTokenAction, clearTokenAction } from '../actions/token'
import { signOutAction } from '../actions/signOut'
import { fetchMeAction } from '../actions/me'

const mapStateToProps = (state) => ({
  token: path([STATE.SING_IN, 'data', 'token'], state),
  username: path([STATE.ME, 'data', 'username'], state),
})

const mapDispatchToProps = dispatch => {
  return {
    setTokenAction: bindActionCreators(setTokenAction, dispatch),
    clearTokenAction: bindActionCreators(clearTokenAction, dispatch),
    fetchMeAction: bindActionCreators(fetchMeAction, dispatch),
    push: bindActionCreators(push, dispatch),
    logout: () => {
      dispatch(signOutAction())
        .then(() => {
          clearToken()
          dispatch(clearTokenAction())
        })
        .catch(() => {
          clearToken()
          dispatch(clearTokenAction())
        })
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        const token = getToken()
        token && props.setTokenAction(token)
      })

    props$
      .filter(prop('token'))
      .distinctUntilChanged(null, prop('token'))
      .subscribe(props =>
        props.fetchMeAction()
          .catch(() =>
            Promise.resolve(props.clearTokenAction())
              .then(clearToken)
              .then(() => props.push(ROUTE.SIGN_IN))
          )
      )

    return props$
  })
)
