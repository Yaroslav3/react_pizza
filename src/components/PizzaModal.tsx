import React, {} from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CloseIcon from '../util/icon/CloseIcon';

export const PizzaModal = ({ pizza, visible, onClose }) => {
    if (!pizza) {return null;}
    console.log('visible', visible)
    console.log('pizza', pizza)
    // const increaseQuantity = () => {
    //     setQuantity(quantity + 1);
    // };
    //
    // const decreaseQuantity = () => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     }
    // };
    // // UseEffect для скидання кількості після закриття вікна
    // useEffect(() => {
    //     if (!visible) {
    //         setQuantity(1);
    //     }
    // }, [visible, setQuantity]);
    //
    if (!pizza) {
      return null;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <CloseIcon/>
                    </TouchableOpacity>
                    <View style={styles.description}>
                        <View style={styles.dlInf}>
                            <Text style={styles.modalTitle}>{pizza.name}</Text>
                            <Image style={styles.modalImage} source={{ uri: pizza.img }} />
                            <Text style={styles.modalPrice}>{pizza.price} грн</Text>
                        </View>
                        <View style={styles.inf}>
                            <Text style={styles.modalPrice}>Опис</Text>
                        </View>
                    </View>
                    {/*<Text style={styles.modalTitle}>{pizza.name}</Text>*/}
                    {/*<Image style={styles.modalImage} source={{ uri: pizza.img }} />*/}
                    {/*<Text style={styles.modalPrice}>{pizza.price} грн</Text>*/}

                    {/*<View style={styles.quantityContainer}>*/}
                    {/*    <TouchableOpacity style={styles.arrowButton} onPress={decreaseQuantity}>*/}
                    {/*        <ArrowLeft style={styles.arrowText} width={20} height={20} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <Text style={styles.quantityText}>{quantity}</Text>*/}
                    {/*    <TouchableOpacity style={styles.arrowButton} onPress={increaseQuantity}>*/}
                    {/*        <ArrowRight style={styles.arrowText} width={20} height={20} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

                    {/*<TouchableOpacity style={styles.orderButton} onPress={onSelect}>*/}
                    {/*    <Text style={styles.buttonSelect}>Замовити</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        height: '60%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    description: {
        flexDirection: 'row',
    },
    dlInf: {
        width: 50,
    },
    inf: {
        width: 50,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    modalImage: {
        width: '80%',
        height: 200,
        borderRadius: 10,
    },
    modalPrice: {
        paddingTop: 10,
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    arrowButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    arrowText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 20,
        marginHorizontal: 10,
    },

    orderButton: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonSelect: {
        color: 'white',
        fontSize: 16,
    },
});
