import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Question from '../screens/Question';

const QuestionStack = createStackNavigator({
  Question: Question,
});

QuestionStack.navigationOptions = {
};

export default createStackNavigator({
  QuestionStack,
});