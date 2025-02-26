import React, {useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import AddressInput from './AddressInput';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/AppNavigator.tsx";
import {OrderEnum, TypeOrder} from "../page/BasketScreen.tsx";
import {useDispatch} from "react-redux";
import {clearCart} from "../store/storeActionPizza.tsx";
import {InputModeOptions} from "react-native/Libraries/Components/TextInput/TextInput";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export interface InputData {
    name: keyof IFormOrder,
    type: InputModeOptions,
    label: string,
    placeholder: string
    required: boolean,
    pattern?: {
        value: RegExp,
        message: string
    };
}
export interface IFormOrder {
    city: string,
    street: string,
    buildingNumber: string,
    entrance: string,
    numberFleet: string,
    floor: string,
    codeEnter: string,
    streetShop: string,

}

const FormScreen = ({type}: {type: TypeOrder}) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const dispatch = useDispatch();
    const {control, handleSubmit, reset} = useForm<IFormOrder>({
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
        { name: 'city', type: 'text', label: 'Місто', placeholder: 'Введіть місто', required: true},
        { name: 'street', type: 'text', label: 'Вулиця', placeholder: 'Введіть вулицю' ,required: true, },
        { name: 'buildingNumber', type: 'text', label: 'Номер дому', placeholder: 'Введіть номер дому', required: true },
        { name: 'entrance', type: 'text', label: 'Під’їзд', placeholder: 'Введіть під’їзд', required: true },
        { name: 'numberFleet', type: 'text', label: 'Номер квартири', placeholder: 'Введіть номер квартири', required: true },
        { name: 'floor', type: 'text', label: 'Поверх', placeholder: 'Введіть поверх', required: true },
        { name: 'codeEnter',  type: 'text',label: 'Код домофону', placeholder: 'Введіть код', required: false},
    ];
    const field: Array<InputData> = [
        {name: 'streetShop', type: 'text', label: 'Вулиця піцерії', placeholder: 'Введіть вулицю', required: true},
    ];

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const renderItem =({item}: { item: InputData }) => (
        <AddressInput control={control} name={item.name} type={item.type} label={item.label}
                      placeholder={item.placeholder}  required={item.required} pattern={item.pattern} />
    );
    const orderInfo: SubmitHandler<IFormOrder> = (data) => {
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
