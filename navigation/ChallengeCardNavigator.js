import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Challenge from '../screens/Challenge';

const ChallengeStack = createSwitchNavigator({
  Challenge: Challenge,
});

ChallengeStack.navigationOptions = {
  title: 'Challenge'
};

export default createSwitchNavigator({
  ChallengeStack,
});