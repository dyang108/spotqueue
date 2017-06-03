import React, { Component } from 'react'
import {
  Navigator
} from 'react-native'
import StationMain from './StationMain'
import TitleStation from './TitleStation'
import AddSongs from './AddSongs'
import NavBar from 'src/components/NavBar'
import styles from 'src/config/styles'

export default class Stations extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  render () {
    const NavigationBarRouteMapper = NavBar
    return (
      <Navigator
        initialRoute={{ title: 'Stations', index: 0 }}
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
      case 'Stations':
        return <StationMain navigator={navigator}/>
      case 'Name Your Station':
        return <TitleStation navigator={navigator}/>
      case 'Add Songs':
        return <AddSongs navigator={navigator}/>
    }
  }
}
