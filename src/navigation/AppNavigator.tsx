import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../page/HomeScreen.tsx';
import BaskedScreen from '../page/BasketScreen.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type RootStackParamList = {
    Home: undefined;
    Basket: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Basket" component={BaskedScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default AppNavigator;
