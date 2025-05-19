import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { selectCartItemsCount } from '../redux/cartSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ShopStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    const cartItemsCount = useSelector(selectCartItemsCount);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === 'Shop') {
                            return <FontAwesome name="shopping-bag" size={size} color={color} />;
                        } else if (route.name === 'CartTab') {
                            return <FontAwesome name="shopping-cart" size={size} color={color} />;
                        } else if (route.name === 'OrdersTab') {
                            return <Ionicons name="list" size={size} color={color} />;
                        }
                    },
                    headerShown: false,
                    tabBarActiveTintColor: '#3498db',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen
                    name="Shop"
                    component={ShopStackNavigator}
                    options={{
                        tabBarLabel: 'Каталог',
                    }}
                />
                <Tab.Screen
                    name="CartTab"
                    component={CartScreen}
                    options={{
                        tabBarLabel: 'Кошик',
                        tabBarBadge: cartItemsCount > 0 ? cartItemsCount : null,
                    }}
                />
                <Tab.Screen
                    name="OrdersTab"
                    component={OrdersScreen}
                    options={{
                        tabBarLabel: 'Замовлення',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;