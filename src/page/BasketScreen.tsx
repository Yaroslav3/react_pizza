import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList, Image, TouchableOpacity, Alert, SafeAreaView, ScrollView,
} from 'react-native';
import {RootState} from '../store/storeReducerPizza.tsx';
import ArrowLeftIcon from '../util/icon/ArrowLeftIcon.tsx';
import ArrowRightIcon from '../util/icon/ArrowRightIcon.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {increaseQuantity, decreaseQuantity, Pizza, clearCart} from '../store/storeActionPizza.tsx';
// @ts-ignore
import EmptyOrder from '../../assets/svg/order-empty';
import FormOrder from "../components/FormOrder.tsx";

export interface DataPizzaList {
    pizza: Pizza;
    quantity: number;
}
export interface TypeOrder{
  type: OrderEnum, isShow: boolean
}
export enum OrderEnum {
  ORDER= 'ORDER',
  ORDER_WITH_YOU = 'ORDER_WITH_YOU'
}

const BasketScreen: React.FC = () => {
    const dispatch = useDispatch();
    const stateSelect: Array<DataPizzaList> = useSelector((state: RootState) => state.cart.cart);
    const totalPrice = stateSelect.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0);
    const [formOrder, setFormOrder] = useState<TypeOrder>({
        type: OrderEnum.ORDER,
        isShow: true
    })
    const handleIncreaseQuantity = (item: DataPizzaList) => {
        dispatch(increaseQuantity(item.pizza));
    };

    const handleDecreaseQuantity = (item: DataPizzaList) => {
        dispatch(decreaseQuantity(item.pizza));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const orderCreate = () => {
        setFormOrder({type: OrderEnum.ORDER, isShow: true})
    };
    const orderCreateWithYou = () => {
        setFormOrder({type: OrderEnum.ORDER_WITH_YOU, isShow: true})
    };


    const renderItem = ({item}: { item: DataPizzaList }) => (
        <View style={styles.itemContainer}>
            <View style={styles.infoOrder}>
                <Image style={styles.modalImage} source={{uri: item.pizza.img}}/>
            </View>
            <View style={styles.details}>
                <View>
                    <Text style={styles.pizzaName}>{item.pizza.name}</Text>
                    <Text>{item.pizza.description}</Text>
                </View>
                <View style={styles.priceContainerInfo}>
                    <View style={styles.priceAll}>
                        <Text style={styles.priceAll_text}>
                            {new Intl.NumberFormat('uk-UA', {
                                style: 'currency',
                                currency: 'UAH'
                            }).format(item.pizza.price * item.quantity)}
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <TouchableOpacity style={styles.arrowButton} onPress={() => handleDecreaseQuantity(item)}>
                            <ArrowLeftIcon/>
                        </TouchableOpacity>
                        <Text style={styles.count}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.arrowButton} onPress={() => handleIncreaseQuantity(item)}>
                            <ArrowRightIcon/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            {stateSelect.length > 0 ? (
                <FlatList
                    data={stateSelect}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.pizza.id.toString()}
                    contentContainerStyle={{flexGrow: 1}}
                    ListHeaderComponent={
                        <>
                            <View style={styles.btnOrder}>
                                <TouchableOpacity
                                    style={(formOrder.isShow && formOrder.type === OrderEnum.ORDER) ? styles.btn_active : styles.btnOrderWithYou}
                                    onPress={orderCreate}>
                                    <Text style={styles.btn_text}>Доставка</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={(formOrder.isShow && formOrder.type === OrderEnum.ORDER_WITH_YOU) ? styles.btn_active : styles.btnOrderWithYou}
                                    onPress={orderCreateWithYou}>
                                    <Text style={styles.btn_text}>Самовивіз</Text>
                                </TouchableOpacity>
                            </View>
                            <FormOrder type={formOrder}/>
                            <View style={styles.finish}>
                                <Text style={styles.finishInfo}>Сума до сплати: </Text>
                                <Text style={styles.finishValue}>
                                    {new Intl.NumberFormat('uk-UA', {
                                        style: 'currency',
                                        currency: 'UAH'
                                    }).format(totalPrice)}
                                </Text>
                            </View>
                            <View style={styles.textInfo}>
                                <Text style={styles.textInfoP}>Ваше замовлення:</Text>
                                <Text style={styles.textInfoPt}>Мінімальна сума для безкоштовної доставки 285
                                    грн.</Text>
                            </View>
                        </>
                    }
                    ListFooterComponent={
                        <View style={styles.finish}></View>
                    }
                />
            ) : (
                <View style={styles.empty}>
                    <Text style={styles.emptyMessage}>Ваш кошик порожній</Text>
                    <EmptyOrder style={styles.emptyMessageIcon} width={200} height={200}/>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    btnOrder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 20,
    },
    btnOrderDelivery: {
        borderRadius: 10,
        width: '45%',
        backgroundColor: 'rgba(152,151,151,0.04)',
        height: 50,
        paddingTop: 5,
    },
    btnOrderWithYou: {
        borderRadius: 10,
        width: '45%',
        backgroundColor: 'rgba(152,151,151,0.04)',
        borderColor: 'rgba(37,37,37,0.24)',
        color: 'black',
        height: 50,
        paddingTop: 5,
    },
    btn_active: {
        backgroundColor: 'rgba(255,207,92,0.85)',
        borderRadius: 10,
        width: '45%',
        borderColor: 'rgba(37,37,37,0.24)',
        color: 'black',
        height: 50,
        paddingTop: 5,
    },
    btn_text: {
        textAlign: 'center',
        color: 'rgb(37,37,37)',
        fontWeight: "bold",
        fontSize: 17,
        paddingTop: 8,
    },
    textInfo: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(166,166,166,0.38)',
    },
    textInfoP: {
        fontSize: 20,
        textAlign: 'left',
    },
    textInfoPt: {
        fontSize: 13,
        textAlign: 'left',
        color: 'rgb(78,77,77)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    content: {
        width: '100%',
        paddingBottom: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    emptyMessageIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    infoOrder: {
        flex: 1,
    },
    modalImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        paddingRight: 10,
        paddingTop: 20,
    },
    details: {
        flex: 3,
    },
    priceContainerInfo: {
        flexDirection: 'row',
    },
    priceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
        backgroundColor: 'rgba(85,85,85,0.22)',
        padding: 5,
        borderRadius: 10,
    },
    arrowButton: {
        padding: 5,
    },
    count: {
        fontSize: 13,
        textAlign: 'center',
        minWidth: 30,
    },
    pizzaName: {
        fontSize: 16,
        fontWeight: 'bold',
        height: 40,
    },
    priceAll: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        gap: 10,
    },
    priceAll_text: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
    finish: {
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 50,
        justifyContent: 'flex-end',
    },
    finishInfo: {
        fontSize: 16,
    },
    finishValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        paddingLeft: 10,
        paddingRight: 20,
    },
});

export default BasketScreen;

