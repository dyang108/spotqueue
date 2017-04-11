import React from 'React'
import {
  ScrollView,
  View,
  Text,
  TextInput 
} from 'react-native'
import styles from 'src/config/styles'
import WideButton from 'src/components/WideButton'
import store from 'src/store'

const SettingsRow = ({ inputValue, inputChange, inputName, editable, multiline }) => (
    <View style={{ flex: 1 }}>
      <View style={ [styles.row, styles.centerSecondary] }>
        <Text style={{ flex: 1 }}>{inputName}</Text>
        <View style={ editable === false ? {flex : 1} : styles.textInputWrapper }>
          <TextInput
            value={ inputValue }
            style={ [multiline ? styles.bigInputBox : styles.inputBox, editable === false ? styles.disabled : {}] }
            selectionColor='#666666'
            onChangeText={ inputChange }
            editable={ editable === false ? false : true }
            multiline={ multiline }/>
        </View>
      </View>
      <View style={styles.hr}></View>
    </View>
  )

export default class SettingsPage extends React.Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = store.getState()
  }

  select(state) {
    return {
      user: state.user
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

  save (user) {
    return function () {
      fetch('http://localhost:8000/user/58d62fc6dfb3170d1899eb85', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      }).then((res) => {
        store.dispatch({
          type: 'USER_EXISTS',
          user: res
        })
      })
    }
  }

  updateUserField = (field) => {
    updateField = (text) => {
      let updatedUser = this.state.user
      updatedUser[field] = text
      this.setState({
        user: updatedUser
      })
    }
    return updateField
  }

  render () {
    const { navigator } = this.props
    return (
      <ScrollView style={ styles.profileView } navigator={ navigator }>
        <WideButton style={ styles.wideButton } onPress={
          function() { navigator.pop() }
        } title="Back" color="transparent"></WideButton>
        <View style={styles.hr}></View>
        <SettingsRow editable={false} inputName="Username" inputValue={ this.state.user.username } inputChange={ this.updateUserField('username') }/>
        <SettingsRow inputName='First Name' inputValue={ this.state.user.firstName } inputChange={ this.updateUserField('firstName') }/>
        <SettingsRow inputName='Last Name' inputValue={ this.state.user.lastName } inputChange={ this.updateUserField('lastName') }/>
        <SettingsRow multiline={true} inputName='Bio' inputValue={ this.state.user.bio } inputChange={ this.updateUserField('bio') }/>
        <WideButton style={ styles.wideButton } onPress={ this.save(this.state.user) } title="Save Changes" color="transparent"></WideButton>
      </ScrollView>
    )
  }
}
