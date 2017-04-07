import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Navigator
} from 'react-native';
import styles from '../../../config/styles';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
  }
  render() {
    var nav = this.props.navigator;
    return (
      <ScrollView style={ styles.profileView } navigator={ this.props.navigator }>
        <View style={ styles.row }>
          <Image style={ styles.profilePic } source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
          <View style={ styles.horizontalSpace }></View>
          <View style={ styles.center }>
            <Text>{ this.state.username }</Text>
            <Text>Followers: { this.state.followers }</Text>
          </View>
          <View style={ styles.center }>
            <Button onPress={
              function () {
                nav.push({ title: 'Settings', index: 1})
              }
            } title="Edit Profile" color="#4c97cf"></Button>
          </View>
        </View>
        <View style={ styles.hr }></View>
        <View style={ styles.row }>{ this.state.bio }</View>
      </ScrollView>
    )
  }
  componentWillMount() {
    fetch("http://localhost:8000/user/58d62fc6dfb3170d1899eb85").then((response) => response.json())
      .then((responseData) => {
        this.setState(responseData);
      })
      .done();
  }
}