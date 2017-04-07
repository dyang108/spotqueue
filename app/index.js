import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NowPlaying from './layouts/NowPlaying'
import ProfilePage from './layouts/ProfilePage'
import StationPage from './layouts/Stations'
import SearchPage from './layouts/Search'
import styles from './config/styles'

export default class spotqueueRN extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar/>
        <ScrollableTabView tabBarPosition="bottom" style={ styles.container }>
          <NowPlaying tabLabel="Now Playing"/>
          <SearchPage tabLabel="Search"/>
          <StationPage tabLabel="Stations"/>
          <ProfilePage tabLabel="Profile"/>
        </ScrollableTabView>
      </View>
    );
  }
}
