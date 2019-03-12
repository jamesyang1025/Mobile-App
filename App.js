/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

'use strict';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Profile from './Profile';
import Repositories from './Repositories';
import Following from './Following';
import Followers from './Followers';
import Icon from 'react-native-vector-icons/Octicons';


const TabNavigator = createBottomTabNavigator({
  Repositories: {
    screen: Repositories,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name={'mark-github'} size={25} color={tintColor} />;
      },
    }
  },

  Following: {
    screen: Following,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name={'heart'} size={25} color={tintColor} />;
      },
    }
  },

  Followers: {
    screen: Followers,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name={'organization'} size={25} color={tintColor} />;
      },
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name={'person'} size={25} color={tintColor} />;
      },
    }
  },

},{
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: 'white',
    inactiveTintColor: 'grey',
    inactiveBackgroundColor: '#87CEEB',
    showIcon: true,
    showLabel: false,
    labelStyle: {
      fontSize: 18,
    },
    style: {

    },
  }
})

type Props = {};

const App = createAppContainer(TabNavigator)
export default App;




const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
});

