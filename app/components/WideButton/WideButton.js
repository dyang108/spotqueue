import ColorPropType from 'ColorPropType'
import Platform from 'Platform'
import React from 'React'
import Text from 'Text'
import TouchableNativeFeedback from 'TouchableNativeFeedback'
import TouchableOpacity from 'TouchableOpacity'
import View from 'View'
import invariant from 'fbjs/lib/invariant'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import StyleSheet from 'StyleSheet'

class WideButton extends React.Component {
  static propTypes = {
    /**
     * Text to display inside the button
     */
    title: React.PropTypes.string.isRequired,
    /**
     * Text to display for blindness accessibility features
     */
    accessibilityLabel: React.PropTypes.string,
    /**
     * Color of the text (iOS), or background color of the button (Android)
     */
    color: ColorPropType,
    fontColor: ColorPropType,
    /**
     * If true, disable all interactions for this component.
     */
    disabled: React.PropTypes.bool,
    /**
     * Handler to be called when the user taps the button
     */
    onPress: React.PropTypes.func.isRequired,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: React.PropTypes.string,
  }

  render () {
    const {
      accessibilityLabel,
      color,
      onPress,
      title,
      disabled,
      testID,
      fontColor,
      icon
    } = this.props
    const buttonStyles = [styles.button]
    const textStyles = [styles.text]
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    if (color) {
      buttonStyles.push({backgroundColor: color})
    }
    if (fontColor) {
      textStyles.push({color: fontColor})
    }
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled)
      textStyles.push(styles.textDisabled)
    }
    invariant(
      typeof title === 'string' ,
      'The title prop of a Button must be a string',
    )
    const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title
    const accessibilityTraits = ['button']
    if (disabled) {
      accessibilityTraits.push('disabled')
    }
    if (icon) {
      return (
        <Touchable
          accessibilityComponentType="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={accessibilityTraits}
          testID={testID}
          disabled={disabled}
          onPress={onPress}>
          <View style={buttonStyles}>
            <Icon name={icon} style={{color: textStyles.color}} />
            <Text style={textStyles} disabled={disabled}>{formattedTitle}</Text>
          </View>
        </Touchable>
      )
    } else {
      return (
        <Touchable
          accessibilityComponentType="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={accessibilityTraits}
          testID={testID}
          disabled={disabled}
          onPress={onPress}
          style={{height: StyleSheet.flatten(buttonStyles).height}}>
          <View style={buttonStyles}>
            <Text style={textStyles} disabled={disabled}>{formattedTitle}</Text>
          </View>
        </Touchable>
      )
    }
  }
}

module.exports = WideButton