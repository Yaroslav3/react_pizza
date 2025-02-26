import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import {Control, Controller, ValidationRule} from 'react-hook-form';
import {IFormOrder} from "./FormOrder.tsx";
import {InputModeOptions} from "react-native/Libraries/Components/TextInput/TextInput";

export interface DataAddressInput {
    control: Control<IFormOrder>
    name: keyof IFormOrder,
    type: InputModeOptions,
    label: string;
    placeholder: string;
    required: boolean;
    pattern?: {
        value: RegExp,
        message: string
    };
}

const AddressInput: React.FC<DataAddressInput> = ({ control, name, type, label, placeholder, required, pattern }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={{
                    required: required ? 'Це поле є обов’язковим' : false,
                    pattern: pattern ? { value: pattern.value, message: pattern.message } : undefined,
                    validate: (value) => {
                        if (type === 'numeric' && isNaN(Number(value))) {
                            return 'Введіть число';
                        }
                        return true;
                    }
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
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default AddressInput;
