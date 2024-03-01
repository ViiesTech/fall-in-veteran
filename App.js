import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/routes'
import { Store } from './src/redux/store'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={Store}>
      <Routes />

      <Toast/>
    </Provider>
  )
}

export default App
