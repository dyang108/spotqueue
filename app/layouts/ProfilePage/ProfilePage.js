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

export default class NowPlaying extends Component {
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
        navigationBar={
          // TODO: Make this work
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                  { return (<Button title="Back" onPress={ function() { navigator.pop() }}></Button>); },
                RightButton: (route, navigator, index, navState) =>
                  { return; },
                Title: (route, navigator, index, navState) =>
                  { return (<Text>Awesome Nav Bar</Text>); },
                }}
             style={{backgroundColor: 'white'}}
           />
        }
      />
    )
  }
  renderScene(route, nav) {
    switch (route.title) {
      case 'Profile':
        return <ScrollView style={ styles.profileView } navigator={nav}>
            <View style={ styles.row }>
              <Image style={ styles.profilePic } source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
              <View style={ styles.horizontalSpace }></View>
              <View style={ styles.center }>
                <Text>{ this.state.username }</Text>
                <Text>Followers: { this.state.followers }</Text>
              </View>
              <View style={ styles.center }>
                <Button onPress={ function() { nav.push({ title: 'Settings', index: 1}) }} title="Edit Profile" color="#4c97cf"></Button>
              </View>
            </View>
            <View style={ styles.hr }></View>
            <View style={ styles.row }>{ this.state.bio }</View>
          </ScrollView>
      case 'Settings':
        return <ScrollView style={ styles.profileView } navigator={nav}>
            <Button onPress={ function() { nav.pop() }} title="Back" color="#4c97cf"></Button>
            <Text>Settings page</Text>
          </ScrollView>
    }
  }
  componentWillMount() {
    fetch("http://localhost:8000/user/58d62fc6dfb3170d1899eb85").then((response) => response.json())
      .then((responseData) => {
        this.setState(responseData);
      })
      .done();
  }
}
