import * as React from 'react';
import { View, Text } from 'react-native';

export default class Map extends React.Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Map Screen</Text>
            </View>
        )
    }
}