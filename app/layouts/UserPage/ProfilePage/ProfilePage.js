import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import store from 'src/store'
import pageStyles from './styles'
import styles from 'src/config/styles'
import WideButton from 'src/components/WideButton'


class ProfilePage extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  render () {
    const { navigator } = this.props
    return (
      <ScrollView style={ styles.profileView } navigator={ navigator }>
        <View style={ styles.row }>
          <Image style={ pageStyles.profilePic } source={{uri: this.props.user.photoUrl}}/>
          <View style={ styles.horizontalSpace }></View>
          <View style={ styles.center }>
            <Text style={ styles.bold }>{ this.props.user.firstName } {this.props.user.lastName}</Text>
            <Text style={ styles.bio }>{ this.props.user.bio }</Text>
          </View>
        </View>
        <View style={ styles.verticalSpace }></View>
          <WideButton onPress={
            function () {
              navigator.push({ title: 'Settings', index: 1})
            }
          } title='Edit Profile' color='transparent'></WideButton>
        <View style={ styles.hr }></View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(ProfilePage)
