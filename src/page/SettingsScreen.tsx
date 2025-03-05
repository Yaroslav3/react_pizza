import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, Clipboard } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/storeReducerPizza.tsx";

const SettingsScreen: React.FC = () => {
    const stateSelect = useSelector((state: RootState) => state.cart);

    const copyToClipboard = () => {
        if (stateSelect.FCMToken) {
            Clipboard.setString(stateSelect.FCMToken); // Копіюємо FCM Token
            Alert.alert("Скопійовано!", "FCM Token скопійовано у буфер обміну.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Device information</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Device: {stateSelect.os}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>FCM Token:</Text>
                    <TouchableOpacity onPress={copyToClipboard} style={styles.tokenWrapper}>
                        <Text style={styles.tokenText} >{stateSelect.FCMToken}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    infoContainer: {
        flexDirection: "column",
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#555",
        marginRight: 10,
        textAlign: 'left'
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    tokenWrapper: {
        padding: 10,
        backgroundColor: "rgba(240,240,240,0.6)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginTop: 5,
    },
    tokenText: {
        fontSize: 14,
        color: "rgba(37,37,37,0.64)",
        fontWeight: "600",
    },
});

export default SettingsScreen;
