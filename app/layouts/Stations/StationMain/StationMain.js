import React, { Component } from 'react'
import {
  ScrollView,
  View
} from 'react-native'
import WideButton from 'src/components/WideButton'
import styles from 'src/config/styles'

export default class StationMain extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  goBack () {
    this.state.navigator.pop()
  }

  render () {
    const { navigator } = this.props
    return (
      <ScrollView navigator={ navigator }>
        <View style={ styles.verticalSpace }></View>
        <WideButton onPress={
            function () {
              navigator.push({ title: 'CreateStation', index: 1})
            }
          } title='Create Station'></WideButton>
      </ScrollView>
    )
  }
}
