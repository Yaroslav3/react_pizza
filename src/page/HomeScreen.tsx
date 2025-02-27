import React, {useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    useColorScheme, Image,
} from 'react-native';
import {CardItem} from '../components/CardItem';
import {pizzaData} from '../data/static-service.tsx';
import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../store/storeReducerPizza.tsx';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Pizza} from '../store/storeActionPizza.tsx';
import BasketIcon from '../util/icon/BasketIcon.tsx';
import {PizzaModal} from '../components/PizzaModal';
import {useNavigation} from '@react-navigation/native';
import SwipeGesture from '../service/swipe-gesture-props.tsx';
import {HomeScreenNavigationProp} from "../../App.tsx";
import {DirectionSwipeEnum} from "../enums/direction-swipe.enum.tsx";


const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const isDarkMode = useColorScheme() === 'dark';
    const stateSelect = useSelector((state: RootState) => state.cart.cart);
    const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const handlePress = (pizza: Pizza) => {
        setSelectedPizza(pizza);
    };

    const onSwipePerformed = (action: { type: string, direction: DirectionSwipeEnum }) => {
        if (action.direction === DirectionSwipeEnum.RIGHT) {
            navigation.navigate('Basket')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SwipeGesture onSwipePerformed={onSwipePerformed} gestureStyle={{ flex: 1 }} type={'HOME'}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.basketBl} onPress={() => navigation.navigate('Basket')}>
                        <BasketIcon />
                        <Badge style={styles.badge}>{stateSelect.length}</Badge>
                    </TouchableOpacity>

                    <StatusBar barStyle={'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />

                    <View style={styles.containerHead}>
                        <View style={styles.hed}>
                            <Image style={styles.icon} source={require('../../free-icon.png')}></Image>
                            <Text style={styles.text}>Смачна піца</Text>
                        </View>
                        <Text style={styles.textDes}>Обери свою смачну піцу!</Text>
                    </View>

                    <ScrollView style={[styles.containerText, { flexGrow: 1 }]}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled={true}>
                        <View style={styles.imgContainer}>
                            {pizzaData.map((pizza, i) => (
                                <CardItem key={i} pizza={pizza} onPress={() => handlePress(pizza)} />
                            ))}
                        </View>
                        <PizzaModal
                            visible={!!selectedPizza}
                            pizza={selectedPizza}
                            onClose={() => setSelectedPizza(null)}
                        />
                    </ScrollView>
                </View>
            </SwipeGesture>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerText: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
    },
    containerHead: {
        backgroundColor: '#FFF',
        padding: 10,
        paddingTop: 5,
    },
    basketBl: {
        zIndex: 9999,
        position: 'absolute',
        right: 8,
        top: 8,
    },
    basketBlIcon: {},
    hed: {
        flexDirection: 'row',
    },
    icon: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 2,
        paddingLeft: 10,
    },
    textDes: {
        marginTop: 15,
        fontSize: 14,
        color: 'grey',
        paddingTop: -12,
    },
    imgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    badge: {
        top: -40,
        backgroundColor: 'rgb(238,50,16)',
        color: 'white',
    },
});

export default HomeScreen;
