import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { CoreModelsInterface } from "../interface/core-models-interface.tsx";

const FormData: React.FC<CoreModelsInterface.DataFiled> = ({ control, name, type, label, placeholder, pattern, optionsSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        {type === 'text' && (
                            <TextInput
                                style={[styles.input, error ? styles.inputError : null]}
                                onChangeText={onChange}
                                value={value}
                                placeholder={placeholder}
                            />
                        )}

                        {type === 'textarea' && (
                            <TextInput
                                style={[styles.input, styles.textarea, error ? styles.inputError : null]}
                                onChangeText={onChange}
                                value={value}
                                placeholder={placeholder}
                                multiline={true}
                                numberOfLines={4}
                            />
                        )}

                        {type === 'select' && optionsSelect && (
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={optionsSelect}
                                setOpen={setOpen}
                                setValue={onChange}
                                onChangeValue={onChange}
                                placeholder={placeholder}
                                listItemLabelStyle={styles.item}
                                style={styles.dropDown}
                                dropDownContainerStyle={styles.dropDownContainer}
                                textStyle={styles.textStyle}
                                arrowIconStyle={styles.arrowIcon}
                                showArrowIcon={true}
                            />
                        )}

                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 18,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
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
        position: "absolute",
        bottom: -16,
        zIndex: 9999
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropDown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    dropDownContainer: {
        backgroundColor: '#f9f9f9',
        shadowOffset: { width: 0, height: 2 },
        borderColor: '#ddd',
        borderTopWidth: 1,
        borderRadius: 8,
        marginTop: 5,
    },
    textStyle: {
        fontSize: 14,
        color: '#3c7c22',
        fontWeight: "bold",
    },
    item: {
        fontSize: 14,
        color: '#333',
        fontWeight: "bold"
    },
    arrowIcon: {
        width: 18,
        height: 18,
        tintColor: '#888',
    },
});

export default FormData;
