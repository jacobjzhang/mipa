import React from 'react';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Settings from '../screens/Settings';

const HomeStack = createBottomTabNavigator({
  Home: Home,
  Settings: Settings,
});

HomeStack.navigationOptions = {
  title: 'Home'
};

export default createSwitchNavigator({
  HomeStack,
});