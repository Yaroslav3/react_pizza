import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/page/HomeScreen";
import { store } from "./src/store/storeReducerPizza.tsx";
import BasketScreen from "./src/page/BasketScreen.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./src/navigation/AppNavigator.tsx";
import { Platform } from "react-native";
import { firebaseAndroidService } from "./src/service/firebase-android.service.tsx";
import SettingsScreen from "./src/page/SettingsScreen.tsx";
import {addedFCMToken, addedOS} from "./src/store/storeActionPizza.tsx";
import {setupForegroundNotifications} from "./src/service/firebase-android.service.tsx";

const Stack = createNativeStackNavigator();
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <MainComponent />
            </SafeAreaProvider>
        </Provider>
    );
};


const MainComponent: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (Platform.OS === "android") {
            setupForegroundNotifications();
            const fetchToken = async () => {
                try {
                    const token = await firebaseAndroidService();
                    if (token) {
                        dispatch(addedFCMToken(token));
                        dispatch(addedOS(Platform.OS));
                    }
                } catch (error) {
                    console.error("Error getting FCM Token:", error);
                }
            };

            fetchToken();
        }
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={{ title: "Обери свою піцу" }} component={HomeScreen} />
                <Stack.Screen name="Basket" options={{ title: "Ваші замовлення" }} component={BasketScreen} />
                <Stack.Screen name="Settings" options={{ title: "Налаштування" }} component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
