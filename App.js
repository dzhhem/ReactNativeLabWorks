import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { GameProvider } from './context/GameContext';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GameProvider>
                <NavigationContainer>
                    <BottomTabNavigator />
                    <StatusBar style="auto" />
                </NavigationContainer>
            </GameProvider>
        </GestureHandlerRootView>
    );
}