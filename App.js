import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProviderCustom, ThemeContext } from './components/ThemeContext';
import TabBarIcon from './components/TabBarIcon';
import StoreScreen from './screens/StoreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ChatScreen from './screens/ChatScreen';
import SafetyScreen from './screens/SafetyScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const ProfilePicture = styled.Image`
    width: 24px;
    height: 24px;
`;

function Tabs() {
    const { themeName } = useContext(ThemeContext);
    const theme = useTheme();

    return (
        <>
            <StatusBar
                style={themeName === 'dark' ? 'light' : 'dark'}
                backgroundColor="transparent"
                translucent={true}
            />

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: theme.colors.tabBar,
                        borderTopWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                        paddingTop: 10,
                        height: 72,
                    },
                    tabBarActiveTintColor: theme.colors.tabBarActive,
                    tabBarInactiveTintColor: theme.colors.tabBarInactive,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Store') {
                            iconName = 'bag-outline';
                        } else if (route.name === 'Community') {
                            iconName = 'person-outline';
                        } else if (route.name === 'Chat') {
                            iconName = 'chatbubble-outline';
                        } else if (route.name === 'Safety') {
                            iconName = 'shield-outline';
                        } else if (route.name === 'Profile') {
                            return <ProfilePicture source={require('./assets/img/my-pfp.png')} />;
                        }

                        return <TabBarIcon name={iconName} color={color} size={size} />;
                    }
                })}
            >
                <Tab.Screen name="Store" component={StoreScreen} />
                <Tab.Screen name="Community" component={CommunityScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Safety" component={SafetyScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </>
    );
}

export default function App() {
    return (
        <ThemeProviderCustom>
            <NavigationContainer>
                <Tabs />
            </NavigationContainer>
        </ThemeProviderCustom>
    );
}
