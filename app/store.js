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

const playlistTitleReducer = function (state = '', action) {
  switch (action.type) {
    case 'PLAYLIST_TITLE':
      return action.title
    default:
      return state
  }
}

const playlistSongReducer = function (state = [], action) {
  switch (action.type) {
    case 'ADD_SONG_TO_PLAYLIST':
      return state.concat([action.songId])
    default:
      return state
  }
}

var playlistReducer = combineReducers({
  title: playlistTitleReducer,
  songs: playlistSongReducer
})

var reducers = combineReducers({
  user: userReducer,
  loginStatus: loginStatusReducer,
  spotifyStatus: spotifyLoginReducer,
  newPlaylist: playlistReducer
})

export default createStore(reducers)
