import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainCardNavigator from './MainCardNavigator';
import ChallengeCardNavigator from './ChallengeCardNavigator';
import QuestionCardNavigator from './QuestionCardNavigator';

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainCardNavigator,
  Challenge: ChallengeCardNavigator,
  Question: QuestionCardNavigator,
}, {
  headerMode: 'none'
});