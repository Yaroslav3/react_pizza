import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/page/HomeScreen';
import {store} from './src/store/storeReducerPizza.tsx';
import BasketScreen from './src/page/BasketScreen.tsx';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" options={{title: 'Обери свою піцу'}} component={HomeScreen} />
                        <Stack.Screen name="Basket" options={{title: 'Ваші замовлення'}} component={BasketScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
};

export default App;
