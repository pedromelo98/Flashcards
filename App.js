import React from 'react';
import { StyleSheet, Text, View, StatusBar, YellowBox, AsyncStorage } from 'react-native';
import Routes from './src/Routes.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers/Reducers.js'
import ReduxThunk from 'redux-thunk'
import Expo, { Constants } from 'expo'


async function register() {
  const { status } = await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS)

  if (status !== 'granted') {
    Expo.Notifications.cancelAllScheduledNotificationsAsync()
    return
  }

  const token = await Expo.Notifications.getExpoPushTokenAsync()

  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10)
  tomorrow.setMinutes(8)

  let localNotification = {
    title: 'Você ainda não estudou hoje!',
    body: "Responda seus decks!",
    ios: { sound: true },
    android: { sound: true, priority: 'high', sticky: false, vibrate: true }
  }

  Expo.Notifications.presentLocalNotificationAsync(localNotification)

  Expo.Notifications.scheduleLocalNotificationAsync(
    localNotification,
    {
      time: tomorrow,
      repeat: 'day',
    }
  )
}


export default class App extends React.Component {

  constructor(props) {
    super(props)
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: componentWillUpdate is deprecated',
    ]);
  }

  componentWillMount() {
    register()
    this.listener = Expo.Notifications.addListener(this.listen)
  }

  componentWillUnmount() {
    this.listener && Expo.Notifications.removeListener(this.listen)
  }

  listen = ({ origin, data }) => {
    console.log(origin, data)
  }



  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
        <Routes />
      </Provider>
    );
  }
}
