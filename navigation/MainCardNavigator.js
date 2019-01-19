import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Result from '../screens/Result';

const HomeStack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <Icon
              name="home"
              color={'black'}
              size={25}
          />
      )
    })
  },
  Result: Result,
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <Icon
              name="settings"
              color={'black'}
              size={25}
          />
      )
    })
  }
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: false
  }
});

HomeStack.navigationOptions = {
  title: 'Home'
};

export default createSwitchNavigator({
  HomeStack,
});