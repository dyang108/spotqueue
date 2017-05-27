import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import MainWrapper from './MainWrapper'
console.ignoredYellowBox = ['Remote debugger']

class spotqueueRN extends Component {
  render () {
    return (
      <Provider store={store}>
        <MainWrapper />
      </Provider>
    )
  }
}

export default spotqueueRN
