import React, { Component } from 'react'
import {
  View,
  TextInput,
  Text,
  ScrollView
} from 'react-native'
import styles from 'src/config/styles'
import WideButton from 'src/components/WideButton'
import store from 'src/store'

export default class TitleStation extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      stationTitle: ''
    }
  }

  updateField (text) {
    this.setState({
      stationTitle: text
    })
  }

  render () {
    const { navigator } = this.props
    // second View used to place in the top half of the screen
    return (
      <ScrollView style={ styles.profileView }>
        <TextInput value={ this.state.stationTitle } onChangeText={ this.updateField.bind(this) } style={styles.inputLine}></TextInput>
        <View style={styles.verticalSpace}/>
        <WideButton title='Create' disabled={this.state.stationTitle === ''} onPress={
          () => {
            store.dispatch({
              type: 'PLAYLIST_TITLE',
              title: this.state.stationTitle
            })
            navigator.push({title: 'Add Songs', index: 2})
          }
        }></WideButton>
      </ScrollView>
    )
  }
}
