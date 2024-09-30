import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import LoadingScreen from './Components/LoadingScreen';
import HomeScreen from './Components/HomeScreen';
import HomeIcon from './Icons/HomeIcon';
import UserIcon from './Icons/UserIcon';
import FavoritesIcon from './Icons/FavoritesIcon';
import PantryIcon from './Icons/PantryIcon';
import CartIcon from './Icons/CartIcon';
import SignUpScreen from './Components/SignUp';
import ThreeDScene from './Components/3DScene';
import ProfileScreen from './Components/ProfileScreen';

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text>Settings Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let IconComponent;

        if (route.name === 'Home') {
          IconComponent = HomeIcon;
        } else if (route.name === 'Favourites') {
          IconComponent = FavoritesIcon;
        }
        else if (route.name === 'Account') {
          IconComponent = UserIcon;
          // return <Image
          //   style={ styles.profilePicture }
          //   source={{ uri: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1724424040/mv-item11_cefm7k.jpg' }}
          // />;
        } else if (route.name === 'My Pantry') {
          IconComponent = PantryIcon;
        } else if (route.name === 'My Cart') {
          IconComponent = CartIcon;
        } else {
          IconComponent = HomeIcon;
        }

        return <IconComponent color={color} size={size} />;
      },
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#c7c8ce',
      tabBarInactiveTintColor: '#7a7b81',
      headerShown: false,
    })}
  >

    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="My Pantry" component={ProfileScreen} />
    <Tab.Screen name="My Cart" component={ThreeDScene} />
    <Tab.Screen name="Favourites" component={SettingsScreen} />
    <Tab.Screen name="Account" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1E2124',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 60,
    backgroundColor: '#2c2d35',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
  },
  profilePicture: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
});

export default App;
