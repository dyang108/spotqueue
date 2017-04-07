import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  profileView: {
    flex: 1,
    padding: 20
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  row: {
    flexDirection: 'row'
  },
  horizontalSpace: {
    width: 20
  },
  hr: {
    marginTop: 15,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: .5
  },
  center: {
    flex: 1,
    justifyContent: 'center'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  wideButton: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
});

export default styles
