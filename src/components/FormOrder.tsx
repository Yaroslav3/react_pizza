import React, {useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import { useForm } from 'react-hook-form';
import AddressInput from './AddressInput';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/AppNavigator.tsx";
import {DataPizzaList, OrderEnum, TypeOrder} from "../page/BasketScreen.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/storeReducerPizza.tsx";
import {clearCart} from "../store/storeActionPizza.tsx";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export interface InputData {
    name: string,
    label: string,
    placeholder: string
    required: boolean
}

const FormScreen = ({type}: {type: TypeOrder}) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const dispatch = useDispatch();
    const {control, handleSubmit, reset} = useForm({
        defaultValues: {
            city: 'Київ'
        }
    })

    useEffect(() => {
        reset({
            city: 'Київ',
        });
    }, [type, reset])

    const fieldsWithOut: Array<InputData> = [
        { name: 'city', label: 'Місто', placeholder: 'Введіть місто', required: true},
        { name: 'street', label: 'Вулиця', placeholder: 'Введіть вулицю' ,required: true },
        { name: 'buildingNumber', label: 'Номер дому', placeholder: 'Введіть номер дому', required: true },
        { name: 'entrance', label: 'Під’їзд', placeholder: 'Введіть під’їзд', required: true },
        { name: 'numberFleet', label: 'Номер квартири', placeholder: 'Введіть номер квартири', required: true },
        { name: 'floor', label: 'Поверх', placeholder: 'Введіть поверх', required: true },
        { name: 'codeEnter', label: 'Код домофону', placeholder: 'Введіть код', required: false },
    ];
    const field: Array<InputData> = [
        {name: 'streetShop', label: 'Вулиця піцерії', placeholder: 'Введіть вулицю', required: true},
    ];

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const renderItem =({item}: { item: InputData }) => (
        <AddressInput control={control} name={item.name} label={item.label} placeholder={item.placeholder}  required={item.required} />
    );
    const orderInfo = (data: any) => {
        const text = type.type === OrderEnum.ORDER_WITH_YOU ? 'Дякую Ви замовили піцу з доставкою!': 'Дякую Ви замовили піцу з самовмвозом!'
        Alert.alert(
            'Замовлення підтверджено',
            text,
            [
              {text: 'ОК', onPress: handleClearCart},
            ],
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Адреса доставки</Text>
            {type.type === 'ORDER' ? (
                <FlatList
                    data={fieldsWithOut}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ gap: 10 }}

                />
            ) : (
                <FlatList
                    data={field}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ gap: 10 }}

                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit((data) => orderInfo(data))}>
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
