import {
  createStore,
  combineReducers
} from 'redux'

// The User Reducer
const userReducer = function (state = {}, action) {
  switch (action.type) {
    case 'USER_EDITED':
      return Object.assign({}, state, action.user)
    case 'LOGGED_IN':
      return Object.assign({}, state, action.user)
    case 'LOGGED_OUT':
      return {}
    default:
      return state
  }
}

const loginStatusReducer = function (state = 'load', action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return 'in'
    case 'LOGGED_OUT':
      return 'out'
    case 'LOGIN_LOADING':
      return 'load'
    default:
      return state
  }
}

const spotifyLoginReducer = function (state = false, action) {
  switch (action.type) {
    case 'SPOTIFY_LOGIN':
      return true
    case 'SPOTIFY_LOGOUT':
      return false
    default:
      return state
  }
}

const newPlaylistReducer = function (state = {}, action) {
  switch (action.type) {
    case 'PLAYLIST_TITLE':
      return Object.assign({}, state, { title: action.title })
    default:
      return state
  }
}

var reducers = combineReducers({
  user: userReducer,
  loginStatus: loginStatusReducer,
  spotifyStatus: spotifyLoginReducer,
  newPlaylist: newPlaylistReducer
})

export default createStore(reducers)
