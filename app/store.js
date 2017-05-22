import {
  createStore
  /* combineReducers */
} from 'redux'

// The User Reducer
const userReducer = function (state = { user: {}, loginStatus: 'load' }, action) {
  switch (action.type) {
    case 'USER_EDITED':
      return Object.assign({}, state, {user: action.user})
    case 'LOGGED_IN':
      return Object.assign({}, state, {user: action.user, loginStatus: 'in'})
    case 'LOGIN_LOADING':
      return Object.assign({}, state, {loginStatus: 'load'})
    case 'LOGGED_OUT':
      return Object.assign({}, state, {user: {}, loginStatus: 'out'})
    default:
      return state
  }
}

var store = createStore(userReducer)

export default store
