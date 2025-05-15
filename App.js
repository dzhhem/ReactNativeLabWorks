import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoScreen from './screens/TodoScreen';

export default function App() {
  const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
  const EXTERNAL_ID = 'vt231_dmyu';

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(APP_ID);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('foregroundWillDisplay',  (event) => {
          console.log('Notification received in foreground:', event.notification);
          event.preventDefault();
          event.notification.display();
        }
    );

    OneSignal.Notifications.addEventListener('click',  (event) => {
      console.log('Notification clicked:', event.notification.title);
    });

    OneSignal.login(EXTERNAL_ID);
    OneSignal.User.pushSubscription.optIn();
    AsyncStorage.setItem('externalId', EXTERNAL_ID);
  }, []);

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TodoScreen />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    paddingTop: 60,
    backgroundColor: '#f2f2f2',
  },
});
