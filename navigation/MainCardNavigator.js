import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';

const HomeStack = createSwitchNavigator({
  Home: Home,
});

HomeStack.navigationOptions = {
  title: 'Home'
};

export default createSwitchNavigator({
  HomeStack,
});