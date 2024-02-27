import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Home from './Home';
import Group from './Group';
import Create from './Create';
import Events from './Events';
import HomeIcon from 'react-native-vector-icons/AntDesign'
import GroupIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EventIcon from 'react-native-vector-icons/FontAwesome'
import ShopIcon from 'react-native-vector-icons/Fontisto'
import  Ionicons from 'react-native-vector-icons/Ionicons'
import MyDrawer from '../../routes/DrawerStack';

import Colors from '../../assets/utils/colors';
import { SafeAreaView } from 'react-native';
import Profile from './Profile';
import Notification from './StackScreens/Notification';
import Jobs from './StackScreens/Jobs';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
function Bottomtabs(){
    return(
        <Stack.Navigator initialRouteName={'Alltabs'} screenOptions={{headerShown:false}}>
      <Stack.Screen name="Alltabs" component={Alltabs} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Jobs" component={Jobs} />

    </Stack.Navigator>
    )
}

function Alltabs() {
    return (
        <SafeAreaView style={{flex:1,backgroundColor: 'black'}}>
        <Tab.Navigator
            initialRouteName='Home'

            screenOptions={{
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: Colors.white,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#002768',
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,


                },


            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}

                options={({ route }) => {
                    console.log(route.name); // Log the route name
                    return {
                        tabBarIcon: ({ focused, size }) => (
                            <HomeIcon name="home" size={size} color={focused ? Colors.red : Colors.white} />

                        ),

                    };
                }}
            />
            <Tab.Screen
                name="Group"
                component={Group}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <GroupIcon name="account-group" size={size} color={focused ? Colors.red : Colors.white} />
                    ),
                })}
            />
            <Tab.Screen
                name="Create"
                component={Create}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <HomeIcon name="plussquareo" size={size} color={focused ? Colors.red : Colors.white} />
                    ),
                })}
            />
            <Tab.Screen
                name="Events"
                component={Events}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <EventIcon name="calendar-check-o" size={size} color={focused ? Colors.red : Colors.white} />
                    ),
                })}
            />


            <Tab.Screen
                name="Profile"
                component={Profile}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons name="person-outline" size={size} color={focused ? Colors.red : Colors.white} />
                    ),
                })}
            />
        </Tab.Navigator>
        </SafeAreaView>
    );
}


export default Bottomtabs