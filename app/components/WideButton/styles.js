import StyleSheet from 'StyleSheet'
import Platform from 'Platform'

// Material design blue from https://material.google.com/style/color.html#color-color-palette

const styles = StyleSheet.create({
  button: {
    elevation: 4,
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    flex: 1
  },
  text: Platform.select({
    ios: {
      color: '#222',
      textAlign: 'center',
      padding: 8,
      fontSize: 18
    },
    android: {
      color: '#222',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500'
    }
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf'
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#a1a1a1'
    },
    android: {
      color: '#a1a1a1'
    }
  })
})

export default styles
