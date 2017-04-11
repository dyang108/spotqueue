import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import {
  Provider
} from 'react-redux'
import store from './store'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NowPlaying from './layouts/NowPlaying'
import ProfilePage from './layouts/UserPage'
import StationPage from './layouts/Stations'
import SearchPage from './layouts/Search'
import styles from './config/styles'
import IconTabBar from './layouts/IconTabBar'

export default class spotqueueRN extends Component {
  render() {
    return (
      <Provider store={ store }>
      <View style={{ flex: 1 }}>
        <StatusBar/>
        <ScrollableTabView tabBarPosition="top" style={ styles.container } renderTabBar={() => <IconTabBar/>}>
          <NowPlaying tabLabel="play"/>
          <SearchPage tabLabel="search"/>
          <StationPage tabLabel="list"/>
          <ProfilePage tabLabel="user"/>
        </ScrollableTabView>
      </View>
      </Provider>
    );
  }
}
