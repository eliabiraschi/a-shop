import { connect } from 'react-redux'
import { userLoggedOut, userLoggedIn, authFail } from '../actions'
import LoginButton from '../components/LoginButton'
import { loginUser, logoutUser } from '../services/user'

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty,
    displayName: state.firebase.profile.displayName
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginFn () {
      loginUser('facebook') // eb_TODO remove hardcoded provider
        .then(() => dispatch(userLoggedIn()))
        .catch(error => {
          console.log(error)
          dispatch(authFail(error))
        })
    },
    logoutFn () {
      logoutUser()
        .then(() => {
          // eb_TODO remove this violence and find a real solution to the fact that the products data is lost after logout
          window.location.href = '/v1'
          dispatch(userLoggedOut())
        })
        .catch(error => dispatch(authFail(error)))
    },
    ...ownProps
  }
}

const UserAccessToggle = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

export default UserAccessToggle
