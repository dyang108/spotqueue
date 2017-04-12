import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import styles from 'src/config/styles'

export default class NowPlaying extends Component {
  render () {
    return (
      <View style={styles.mainView}>
        <Text>Now playing</Text>
      </View>
    )
  }
}
