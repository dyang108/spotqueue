import React, { Component } from 'react'
import {
  ScrollView,
  Text
} from 'react-native'

export default class CreateStation extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  render () {
    const { navigator } = this.props
    return (
      <ScrollView navigator={ navigator }>
        <Text>Create a station here</Text>
      </ScrollView>
    )
  }
}
