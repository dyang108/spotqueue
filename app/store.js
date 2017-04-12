import {
  createStore
  /* combineReducers */
} from 'redux'

// The User Reducer
const userReducer = function (state = { user: {} }, action) {
  switch (action.type) {
    case 'USER_EXISTS':
      return Object.assign({}, state, {user: action.user})
    default:
      return state
  }
}

var store = createStore(userReducer)

export default store
