import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormData from './FormData.tsx';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator.tsx";
import { OrderEnum, TypeOrder } from "../page/BasketScreen.tsx";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/storeActionPizza.tsx";
import { CoreModelsInterface } from "../interface/core-models-interface.tsx";
import {
    fieldOrderWithYou,
    fieldsDelivery,
    schemaFieldsDelivery,
    schemaFieldWithYou
} from "../util/form-data/formData.tsx";
import { yupResolver } from "@hookform/resolvers/yup";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FormScreen = ({ type }: { type: TypeOrder }) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const dispatch = useDispatch();

    const { control: controlDelivery, handleSubmit: handleSubmitDelivery, reset: resetDelivery } = useForm<CoreModelsInterface.IFormOrder>({
        defaultValues: {
            city: 'Київ'
        },
        resolver: yupResolver<any>(schemaFieldsDelivery),
    });

    const { control: controlWithYou, handleSubmit: handleSubmitWithYou, reset: resetWithYou } = useForm<CoreModelsInterface.IFormOrderWithYou>({
        defaultValues: {
            streetShop: '',
        },
        resolver: yupResolver<any>(schemaFieldWithYou),
    });

    useEffect(() => {
        if (type.type === OrderEnum.ORDER) {
            resetDelivery({ city: 'Київ' });
        } else {
            resetWithYou({ streetShop: '' });
        }
    }, [type, resetDelivery, resetWithYou]);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const renderItemDelivery = ({ item }: { item: CoreModelsInterface.DataFiled }) => (
        <FormData control={controlDelivery} name={item.name} type={item.type} label={item.label}
                  placeholder={item.placeholder} pattern={item.pattern} optionsSelect={item.optionsSelect} />
    );

    const renderItemWithYou = ({ item }: { item: CoreModelsInterface.DataFiled }) => (
        <FormData control={controlWithYou} name={item.name} type={item.type} label={item.label}
                  placeholder={item.placeholder} pattern={item.pattern} optionsSelect={item.optionsSelect} />
    );

    const orderInfo: SubmitHandler<CoreModelsInterface.IFormOrder | CoreModelsInterface.IFormOrderWithYou> = (data) => {
        console.log('ddd', data);
        const text = type.type === OrderEnum.ORDER_WITH_YOU
            ? 'Дякую Ви замовили піцу з доставкою!'
            : 'Дякую Ви замовили піцу з самовивозом!';

        Alert.alert(
            'Замовлення підтверджено',
            text,
            [
                { text: 'ОК', onPress: handleClearCart },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Адреса доставки</Text>
            {type.type === 'ORDER' ? (
                <FlatList
                    style={styles.flatList}
                    data={fieldsDelivery}
                    renderItem={renderItemDelivery}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ gap: 10 }}
                />
            ) : (
                <FlatList
                    style={styles.flatList}
                    data={fieldOrderWithYou}
                    renderItem={renderItemWithYou}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ gap: 10 }}
                />
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={type.type === 'ORDER' ? handleSubmitDelivery(orderInfo) : handleSubmitWithYou(orderInfo)}
            >
                <Text style={styles.buttonText}>Оформити замовлення</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button_rest} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Повернутися до меню</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    flatList: {
        zIndex: 9999
    },
    button: {
        backgroundColor: '#ee3210',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    button_rest: {
        backgroundColor: '#cacaca',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default FormScreen;
