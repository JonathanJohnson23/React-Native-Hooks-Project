import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Weather from '../screens/weather';
import Time from '../screens/time';

export default createAppContainer(
  createMaterialTopTabNavigator(
    {
      WeatherRT: { 
        screen: Weather, 
        navigationOptions: ({ navigation }) => ({
          title: 'Weather',
      })},
      TimeRT: {
        screen: Time,
        navigationOptions: ({ navigation }) => ({
          title: 'Time',

      })},
    },
    {
      initialRouteName: 'WeatherRT',
      initialLayout: {height: '100px'},
      barStyle: { backgroundColor: 'red' },
      style: { backgroundColor: '#fff' },
      tabBarOptions :{
        style: { backgroundColor: 'purple', paddingTop: 25 },
        // tabStyle: {backgroundColor: 'pink'},
        // labelStyle: {backgroundColor: 'blue'},
      }
    }
  )
)