import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export const QRCode: React.FC<any> = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Твоя дисконтна карта</Text>
            <Text style={styles.number}>№551347400</Text>
            <View style={styles.code}>
                <Image style={styles.icon} source={require('../../assets/png/qr_code.png')}></Image>
            </View>
            <Text style={styles.info}>Це ваша картка. Щоб використати її покажіть QR-код на касі.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        width: '90%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 10,
    },
    number: {
        color: '#37b72a',
        fontWeight: 'bold',
        fontSize: 18
    },
    code: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 200,
        height: 210,
    },
    icon: {
        width: 200,
        height: 210,
    },
    info: {
        paddingTop: 10,
        color: 'black',
        fontSize: 15,
        textAlign: "center"
    }
});
