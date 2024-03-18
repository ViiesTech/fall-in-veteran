import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Routes from './src/routes'
import { Store } from './src/redux/store'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';
import socketServices from './src/socket/Socket_Service'


const App = () => {


  useEffect(()=>{
    socketServices.initiaize()
  },[])

  return (
    <Provider store={Store}>
      <Routes />

      <Toast/>
    </Provider>
  )
}

export default App
