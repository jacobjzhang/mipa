import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import MainCardNavigator from './MainCardNavigator';
import ChallengeCardNavigator from './ChallengeCardNavigator';
import QuestionCardNavigator from './QuestionCardNavigator';
import Result from '../screens/Result';

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: Login,
  Main: MainCardNavigator,
  Challenge: ChallengeCardNavigator,
  Question: QuestionCardNavigator,
  Result: Result
}, {
  headerMode: 'none'
});