import React, { Component } from 'react'
import {
  View,
  Navigator
} from 'react-native'
import styles from 'src/config/styles'
import WideButton from 'src/components/WideButton'
import StationMain from './StationMain'
import CreateStation from './CreateStation'

export default class Stations extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  render () {
    return (
      <Navigator
        initialRoute={{ title: 'StationMain', index: 0 }}
        renderScene={(route, navigator) => {
          return this.renderScene(route, navigator)
        }}
      />
    )
  }

  renderScene (route, navigator) {
    switch (route.title) {
      case 'StationMain':
        return <StationMain navigator={navigator}/>
      case 'CreateStation':
        return <CreateStation navigator={navigator}/>
    }
  }
}
