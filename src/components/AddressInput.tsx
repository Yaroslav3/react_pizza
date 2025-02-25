import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

export interface DataAddressInput {
    control: any;
    name: string;
    label: string;
    placeholder: string;
    required?: boolean
}

const AddressInput: React.FC<DataAddressInput> = ({ control, name, label, placeholder, required = false }) => {

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={{
                    required: required ? 'Це поле є обов’язковим' : false
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={[styles.input, error ? styles.inputError : null]}
                            onChangeText={onChange}
                            value={value}
                            placeholder={placeholder}
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    inputError: {
        borderColor: 'red', // Червоний бордер для індикації помилки
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default AddressInput;
