import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Question from '../screens/Question';

const QuestionStack = createSwitchNavigator({
  Question: Question,
});

QuestionStack.navigationOptions = {
  title: 'Question'
};

export default createSwitchNavigator({
  QuestionStack,
});