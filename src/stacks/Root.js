import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from '../stacks/Loading';
import Statistic from '../screens/Statistic';

const Stack = createStackNavigator();

function Root() {
    return (
        <Stack.Navigator initialRouteName="Loading">
            <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
            <Stack.Screen name="Statistic" component={Statistic} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Root;