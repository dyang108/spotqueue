import {
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20.5,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    alignItems: 'center',
    flexDirection: 'column'
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
    borderColor: '#ddd',
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
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  wideButton: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black'
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
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    flex: 1
  },
  disabled: {
    color: '#bbb'
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 20
  },
  bio: {
    color: '#888'
  },
  navBar: {
    backgroundColor: '#ddd',
    borderBottomWidth: 0.5,
    borderBottomColor: '#666'
  },
  backButton: {
    marginLeft: 15,
    width: 50,
    marginTop: -6
  }
})

export default styles
