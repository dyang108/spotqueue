import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 18
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
  }
});

export default styles
