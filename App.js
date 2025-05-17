import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';
import FileManager from './components/FileManager';
import FileViewer from './components/FileViewer';
import FileDetails from './components/FileDetails';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setupAppDirectory = async () => {
      try {
        const appDir = FileSystem.documentDirectory + 'AppData/';
        const dirInfo = await FileSystem.getInfoAsync(appDir);

        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(appDir, { intermediates: true });
          console.log('AppData directory created');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error setting up AppData directory:', error);
        setIsLoading(false);
      }
    };

    setupAppDirectory();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="FileManager">
          <Stack.Screen
              name="FileManager"
              component={FileManager}
              options={{ title: 'Файловий менеджер' }}
          />
          <Stack.Screen
              name="FileViewer"
              component={FileViewer}
              options={({ route }) => ({ title: route.params.fileName })}
          />
          <Stack.Screen
              name="FileDetails"
              component={FileDetails}
              options={{ title: 'Деталі файлу' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
