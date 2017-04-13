import React from 'React'
import {
  ScrollView,
  View,
  Text,
  TextInput 
} from 'react-native'
import { connect } from 'react-redux'
import styles from 'src/config/styles'
import WideButton from 'src/components/WideButton'
import store from 'src/store'

const SettingsRow = ({ inputValue, inputChange, inputName, editable, multiline }) => (
    <View style={{ flex: 1 }}>
      <View style={ [styles.row, styles.centerSecondary] }>
        <Text style={{ flex: 1 }}>{ inputName }</Text>
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

class SettingsPage extends React.Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.state.user = this.props.user
    this.state.editedUser = this.props.user
    this.state.navigator = this.props.navigator
  }

  save (user) {
    return function () {
      fetch('http://localhost:8000/user/' + user.userID, {
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

  goBack = () => {
    this.state.navigator.pop()
  }

  render () {
    return (
      <ScrollView style={ styles.profileView } navigator={ this.state.navigator }>
        <WideButton style={ styles.wideButton } onPress={ this.goBack.bind(this) } title='Back' color='transparent'></WideButton>
        <View style={styles.hr}></View>
        <SettingsRow multiline={true} inputName='Bio' inputValue={ this.state.editedUser.bio } inputChange={ this.updateUserField('bio') }/>
        <WideButton style={ styles.wideButton } onPress={ this.save(this.state.editedUser) } title='Save Changes' color='transparent'></WideButton>
      </ScrollView>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(SettingsPage)
