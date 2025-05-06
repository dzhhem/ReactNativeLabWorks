import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Image source={require('./assets/img/logo.png')} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>FirstMobileApp</Text>
      </View>

      <View style={styles.main}>
        <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIndicatorStyle: { display: 'none' },
                tabBarStyle: { backgroundColor: '#f0f0f0' },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color }) => {
                  if (route.name === 'Головна') {
                    return <Entypo name="home" size={26} color={color} />;
                  } else if (route.name === 'Фотогалерея') {
                    return <Entypo name="image" size={26} color={color} />;
                  } else if (route.name === 'Профіль') {
                    return <Entypo name="user" size={26} color={color} />;
                  }
                },
              })}
          >
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerCopy}>Джегур Макар Юрійович, ВТ-23-1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerLogo: {
    resizeMode: 'contain',
    width: 160,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  main: {
    flexGrow: 1,
    flexShrink: 1 ,
    flexBasis: 'auto',
  },
  footer: {
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 30,
  },
  footerCopy: {
    fontSize: 14,
    fontStyle: 'italic',
  }
});