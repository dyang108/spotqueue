import React from 'react'
import {
  TouchableHighlight,
  Text
} from 'react-native'
import barStyles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default {
  LeftButton (route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight style={barStyles.backButton} onPress={() => {
          if (index > 0) {
            navigator.pop()
          }
        }}>
          <Icon name='angle-left' size={30} />
        </TouchableHighlight>
      )
    } else {
      return null
    }
  },
  RightButton (route, navigator, index, navState) {
    return null
  },
  Title (route, navigator, index, navState) {
    return (<Text style={barStyles.title}>{route.title.toUpperCase()}</Text>)
  }
}
