import React, { Component } from 'react'
import {
  Navigator
} from 'react-native'
import { connect } from 'react-redux'
import store from 'src/store'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'
import WideButton from 'src/components/WideButton'

class UserPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Profile', index: 0 }}
        renderScene={(route, navigator) =>
          {return this.renderScene(route, navigator)}
        }
      />
    )
  }

  renderScene(route, navigator) {
    switch (route.title) {
      case 'Profile':
        return <ProfilePage navigator={ navigator }/>
      case 'Settings':
        return <SettingsPage navigator={ navigator }/>
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/user/58d62fc6dfb3170d1899eb85').then((response) => response.json())
      .then((response) => {
        store.dispatch({
          type: 'USER_EXISTS',
          user: response
        })
      })
      .done()
  }
}

const mapStateToProps = function (store) {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(UserPage)
