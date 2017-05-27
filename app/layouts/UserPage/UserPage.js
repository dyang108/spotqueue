import React, { Component } from 'react'
import {
  Navigator,
  TouchableHighlight,
  Text,
  View
} from 'react-native'
// import { connect } from 'react-redux'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'
import styles from 'src/config/styles'
import Icon from 'react-native-vector-icons/FontAwesome'

class UserPage extends Component {
  render () {
    const NavigationBarRouteMapper = {
      LeftButton (route, navigator, index, navState) {
        if (index > 0) {
          return (
            <TouchableHighlight style={styles.backButton} onPress={() => {
              if (index > 0) {
                navigator.pop()
              }
            }}>
              <Icon name='angle-left' size={30} />
            </TouchableHighlight>
          )
        } else {
          return null
        }
      },
      RightButton (route, navigator, index, navState) {
        return null
      },
      Title (route, navigator, index, navState) {
        return (<Text>{route.title.toUpperCase()}</Text>)
      }
    }

    return (
      <Navigator
        initialRoute={{ title: 'Profile', index: 0 }}
        renderScene={(route, navigator) => {
          return this.renderScene(route, navigator)
        }}
        navigationBar={
          <Navigator.NavigationBar routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />}
        sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight + 20}}
      />
    )
  }

  renderScene (route, navigator) {
    switch (route.title) {
      case 'Profile':
        return <ProfilePage navigator={navigator} />
      case 'Settings':
        return <SettingsPage navigator={navigator} />
    }
  }
}

export default UserPage
