import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import GameScreen from '../screens/GameScreen';
import TasksScreen from '../screens/TasksScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#6200EE',
                tabBarInactiveTintColor: 'gray',
                headerStyle: {
                    backgroundColor: '#6200EE',
                },
                headerTintColor: '#fff',
            }}
        >
            <Tab.Screen
                name="Game"
                component={GameScreen}
                options={{
                    title: 'Гра',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="game-controller" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tasks"
                component={TasksScreen}
                options={{
                    title: 'Завдання',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;