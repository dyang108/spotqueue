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

const playlistTitleReducer = function (state = '', action) {
  switch (action.type) {
    case 'PLAYLIST_TITLE':
      return action.title
    case 'PLAYLIST_SAVED_TO_SERVER':
      return ''
    default:
      return state
  }
}

const playlistSongReducer = function (state = [], action) {
  switch (action.type) {
    case 'ADD_SONG_TO_PLAYLIST':
      return state.concat([action.song])
    case 'PLAYLIST_SAVED_TO_SERVER':
      return []
    default:
      return state
  }
}

const allPlaylistReducer = function (state = [], action) {
  switch (action.type) {
    case 'GOT_ALL_PLAYLISTS':
      return action.playlists
    case 'PLAYLIST_SAVED_TO_SERVER':
      return state.concat([action.playlist])
    default:
      return state
  }
}

const nowPlayingReducer = function (state = '', action) {
  switch (action.type) {
    case 'RADIO_ON':
      return action.radioId
    case 'RADIO_OFF':
      return ''
    default:
      return state
  }
}

var playlistCreationReducer = combineReducers({
  title: playlistTitleReducer,
  songs: playlistSongReducer
})

var reducers = combineReducers({
  user: userReducer,
  loginStatus: loginStatusReducer,
  newPlaylist: playlistCreationReducer,
  playlists: allPlaylistReducer,
  nowPlaying: nowPlayingReducer
})

export default createStore(reducers)
