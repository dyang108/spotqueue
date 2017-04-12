import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import NowPlaying from './layouts/NowPlaying'
import ProfilePage from './layouts/UserPage'
import StationPage from './layouts/Stations'
import SearchPage from './layouts/Search'
import styles from './config/styles'
import IconTabBar from './components/IconTabBar'

export default class MainView extends Component {
  render () {
    // switch between logged in and out
    // switch (this.props.loginStatus) {
    //   case ('load'):
    //     return <View style={styles.container}><Text>Loading</Text></View>
    //   case ('in'):
    return (
      <ScrollableTabView tabBarPosition='top' style={styles.container} renderTabBar={() => <IconTabBar />}>
        <NowPlaying tabLabel='play' />
        <SearchPage tabLabel='search' />
        <StationPage tabLabel='list' />
        <ProfilePage tabLabel='user' />
      </ScrollableTabView>
    )
      // case ('out'):
      //   return <View style={styles.container}><Text>Not logged in</Text></View>
    // }
  }
}
