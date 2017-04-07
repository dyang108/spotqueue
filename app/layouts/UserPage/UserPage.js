import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Navigator
} from 'react-native';
import styles from '../../config/styles';
import ProfilePage from './ProfilePage'

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  renderScene(route, nav) {
    switch (route.title) {
      case 'Profile':
        return <ProfilePage navigator={nav}/>
      case 'Settings':
        return (
          <ScrollView style={ styles.profileView } navigator={nav}>
            <Button style={ styles.wideButton } onPress={ function() { nav.pop() }} title="Back" color="#4c97cf"></Button>
            <Text>Settings page</Text>
          </ScrollView>
        )
    }
  }
}
