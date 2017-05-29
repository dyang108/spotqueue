import React, { Component } from 'react'
import Platform from 'Platform'
import {
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class IconButton extends Component {
  static propTypes = {
    icon: React.PropTypes.string,
    onPress: React.PropTypes.func.isRequired
  }

  render () {
    const {
      onPress,
      icon
    } = this.props
    const style = {
      height: 40,
      width: 40,
      marginLeft: 5,
      marginRight: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ddd',
      alignItems: 'center',
      backgroundColor: '#eee',
      paddingTop: 7
    }
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return (<Touchable style={style} onPress={onPress}>
      <Icon name={icon} size={20} />
    </Touchable>)
  }
}
