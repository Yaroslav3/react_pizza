import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
    const { cart } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ваше замовлення</Text>
            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.pizza.name} - {item.quantity} шт.</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    item: {
        marginVertical: 10,
    },
});

export default CartScreen;
