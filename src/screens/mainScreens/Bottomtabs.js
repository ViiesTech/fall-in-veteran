import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Group from './Group';
import Create from './Create';
import Events from './Events';
import Shop from './Shop';
import HomeIcon from 'react-native-vector-icons/AntDesign'
import GroupIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EventIcon from 'react-native-vector-icons/FontAwesome'
import ShopIcon from 'react-native-vector-icons/Fontisto'
import MyDrawer from '../../routes/DrawerStack';

const Tab = createBottomTabNavigator();



function Bottomtabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'

            screenOptions={{
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'white',
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
                            <HomeIcon name="home" size={size} color={focused ? "red" : "white"} />

                        ),

                    };
                }}
            />
            <Tab.Screen
                name="Group"
                component={Group}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <GroupIcon name="account-group" size={size} color={focused ? "red" : "white"} />
                    ),
                })}
            />
            <Tab.Screen
                name="Create"
                component={Create}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <HomeIcon name="plussquareo" size={size} color={focused ? "red" : "white"} />
                    ),
                })}
            />
            <Tab.Screen
                name="Events"
                component={Events}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <EventIcon name="calendar-check-o" size={size} color={focused ? "red" : "white"} />
                    ),
                })}
            />
         

<Tab.Screen
                name="Shop"
                component={MyDrawer}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => (
                        <ShopIcon name="shopping-store" size={size} color={focused ? "red" : "white"} />
                    ),
                })}
            />
        </Tab.Navigator>
    );
}


export default Bottomtabs