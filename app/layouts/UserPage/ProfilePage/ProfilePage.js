import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import store from 'src/store'
import styles from 'src/config/styles'
import WideButton from 'src/components/WideButton'


class ProfilePage extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = store.getState()
  }

  select(storedState) {
    return {
      user: storedState.user
    }
  }

  componentDidMount() {
    this.setState(this.select(store.getState()))
    this.unsubscribe = store.subscribe(() => {
      this.setState(this.select(store.getState()))
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { navigator } = this.props
    return (
      <ScrollView style={ styles.profileView } navigator={ navigator }>
        <View style={ styles.row }>
          <Image style={ styles.profilePic } source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
          <View style={ styles.horizontalSpace }></View>
          <View style={ styles.center }>
            <Text style={ styles.bold }>{ this.state.user.firstName } {this.state.user.lastName}</Text>
            <Text style={ styles.bio }>{ this.state.user.username }</Text>
            <Text style={ styles.bio }>{ this.state.user.bio }</Text>
          </View>
        </View>
        <View style={ styles.verticalSpace }></View>
          <WideButton onPress={
            function () {
              navigator.push({ title: 'Settings', index: 1})
            }
          } title="Edit Profile" color="transparent"></WideButton>
        <View style={ styles.hr }></View>
      </ScrollView>
    )
  }

}

export default ProfilePage
