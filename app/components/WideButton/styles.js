import StyleSheet from 'StyleSheet';
import Platform from 'Platform';

// Material design blue from https://material.google.com/style/color.html#color-color-palette
let defaultBlue = '#2196F3';
if (Platform.OS === 'ios') {
  // Measured default tintColor from iOS 10
  defaultBlue = '#0C42FD';
}

const styles = StyleSheet.create({
  button: {
    elevation: 4,
    // backgroundColor: defaultBlue,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    flex: 1,
  },
  text: Platform.select({
    ios: {
      color: '#222',
      textAlign: 'center',
      padding: 8,
      fontSize: 18,
    },
    android: {
      color: '#222',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500',
    },
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#a1a1a1',
    },
    android: {
      color: '#a1a1a1',
    }
  }),
});

export default styles;