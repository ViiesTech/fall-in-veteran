import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/routes'
import { store } from './src/redux/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App
