import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from 'src/config/styles'


export default class SearchPage extends Component {
  render() {
    return (
      <View style={ styles.mainView }>
      <Text>Search</Text>
      </View>
    );
  }
}

