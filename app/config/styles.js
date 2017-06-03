import {
  StyleSheet
} from 'react-native'

const resultHeight = 80
const inputsHeight = 40
const lightGray = '#eee'
const mediumGray = '#aaa'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20.5,
    alignItems: 'center'
  },
  profileView: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row'
  },
  horizontalSpace: {
    width: 20
  },
  verticalSpace: {
    flex: 1,
    height: 12
  },
  hr: {
    marginTop: 15,
    marginBottom: 15,
    borderColor: lightGray,
    borderWidth: 0.5,
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center'
  },
  centerSecondary: {
    alignItems: 'center'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: lightGray
  },
  wideButton: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  inputBox: {
    height: 30,
    padding: 5,
    flex: 1
  },
  bigInputBox: {
    height: 60,
    padding: 5,
    flex: 1
  },
  textInputWrapper: {
    borderBottomColor: mediumGray,
    borderBottomWidth: 1,
    flex: 1
  },
  disabled: {
    color: mediumGray
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333'
  },
  bio: {
    color: mediumGray
  },
  navBar: {
    backgroundColor: lightGray,
    borderBottomWidth: 0.5,
    borderBottomColor: mediumGray
  },
  inputLine: {
    borderWidth: 1,
    borderColor: lightGray,
    borderRadius: 5,
    padding: 10,
    height: inputsHeight,
    flex: 1
  },
  albumArt: {
    height: resultHeight,
    width: resultHeight
  },
  searchResult: {
    borderTopWidth: 1,
    height: resultHeight,
    flex: 1,
    padding: 5,
    borderTopColor: lightGray
  },
  gray: {
    color: mediumGray
  },
  buttonStyle: {
    height: inputsHeight,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingTop: 7
  }
})

export default styles
