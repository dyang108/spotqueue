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

// TODO: get rid of subscribe

export default class SettingsPage extends React.Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = this.select(store.getState())
  }

  select(storedState) {
    // cache the edited User as a separate object, otherwise edits will
    // spread on the client side
    return {
      user: storedState.user,
      editedUser: Object.assign({}, storedState.user)
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
      })
      .then((res) => {
        return res.json()
      })
      .then((resJson) => {
        store.dispatch({
          type: 'USER_EDITED',
          user: resJson
        })
      })
    }
  }

  // function used to change the value in the state (this is what
  // appears in each of the settingsRows). Otherwise, will revert
  // to originial inputValue
  updateUserField = (field) => {
    updateField = (text) => {
      let updatedUser = this.state.editedUser
      updatedUser[field] = text
      this.setState({
        editedUser: updatedUser
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
        } title='Back' color='transparent'></WideButton>
        <View style={styles.hr}></View>
        <SettingsRow editable={false} inputName='Username' inputValue={ this.state.user.username } />
        <SettingsRow multiline={true} inputName='Bio' inputValue={ this.state.editedUser.bio } inputChange={ this.updateUserField('bio') }/>
        <WideButton style={ styles.wideButton } onPress={ this.save(this.state.editedUser) } title='Save Changes' color='transparent'></WideButton>
      </ScrollView>
    )
  }
}
