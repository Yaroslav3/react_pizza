import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../src/components/HomeScreen';
import CartScreen from '../../src/components/CartScreen';

export type RootStackParamList = {
    Home: undefined;
    Cart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
