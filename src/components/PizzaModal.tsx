import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CloseIcon from '../util/icon/CloseIcon';
import ArrowRightIcon from '../util/icon/ArrowRightIcon.tsx';
import ArrowLeftIcon from '../util/icon/ArrowLeftIcon.tsx';
import {RootState} from '../store/storeReducerPizza.tsx';
import {useDispatch, useSelector} from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity } from '../store/storeActionPizza.tsx';

export const PizzaModal: React.FC<any> = ({pizza, visible, onClose}) => {
  const dispatch = useDispatch();
  const stateSelect = useSelector((state: RootState) => state.cart.cart);

  if (!pizza) {
    return null;
  }

  const selectedPizza = stateSelect.find((item) => item.pizza.id === pizza.id);
  const quantity = selectedPizza ? selectedPizza.quantity : 1;

  const handleOrder = () => {
    if (!selectedPizza) {
      dispatch(addToCart({pizza, quantity}));
    }
  }
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(pizza));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(pizza));
  };

  return (
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CloseIcon />
            </TouchableOpacity>
            <View style={styles.description}>
              <Text style={styles.modalTitle}>{pizza.name}</Text>
              <View style={styles.rowContainer}>
                <View style={styles.dlInf}>
                  <Image style={styles.modalImage} source={{ uri: pizza.img }} />
                </View>
                <View style={styles.inf}>
                  <Text style={styles.ingredients}>Інгредієнти</Text>
                  <Text style={styles.textDes}>{pizza.description}</Text>
                  <View style={styles.selectContainer}>
                    {!selectedPizza ? (<>
                      <View style={styles.btn_bl}>
                        <Text style={styles.btn} onPress={handleOrder}>Замовити</Text></View>
                    </>):(<>
                      <View style={styles.priceContainer}>
                        <TouchableOpacity style={styles.arrowButton} onPress={handleDecreaseQuantity}>
                          <ArrowLeftIcon />
                        </TouchableOpacity>
                        <Text style={styles.count}>{quantity}</Text>
                        <TouchableOpacity style={styles.arrowButton} onPress={handleIncreaseQuantity}>
                          <ArrowRightIcon />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.priceAll}>
                        <Text style={styles.priceAll_text}>
                          {new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(pizza.price * quantity)}
                        </Text>
                      </View></>)}
                  </View>
                </View>
              </View>
            </View>
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalContent: {
    height: '40%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  description: {
    padding: 16,
  },
  modalTitle: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  dlInf: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 30,
  },
  inf: {
    flex: 3,
    alignItems: 'flex-start',
  },
  ingredients: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  textDes: {
    fontSize: 12,
    maxHeight: 150,
    justifyContent: 'center',
  },
  selectContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn_bl: {
    paddingTop: 10,
  },
  btn: {
    borderRadius: 5,
    width: 100,
    backgroundColor: '#ffcf5c',
    color: 'black',
    textAlign: 'center',
    paddingTop: 5,
    height: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    backgroundColor: 'rgba(85,85,85,0.22)',
    padding: 5,
    borderRadius: 10,
  },
  priceAll: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  priceAll_text: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  arrowButton: {
    padding: 5,
  },
  count: {
    fontSize: 13,
    textAlign: 'center',
    minWidth: 30,
  },
});



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
export default PizzaModal;
// {/*<Text style={styles.modalTitle}>{pizza.name}</Text>*/}
// {/*<Image style={styles.modalImage} source={{ uri: pizza.img }} />*/}
// {/*<Text style={styles.modalPrice}>{pizza.price} грн</Text>*/}
//
// {/*<View style={styles.quantityContainer}>*/}
// {/*    <TouchableOpacity style={styles.arrowButton} onPress={decreaseQuantity}>*/}
// {/*        <ArrowLeft style={styles.arrowText} width={20} height={20} />*/}
// {/*    </TouchableOpacity>*/}
// {/*    <Text style={styles.quantityText}>{quantity}</Text>*/}
// {/*    <TouchableOpacity style={styles.arrowButton} onPress={increaseQuantity}>*/}
// {/*        <ArrowRight style={styles.arrowText} width={20} height={20} />*/}
// {/*    </TouchableOpacity>*/}
// {/*</View>*/}
//
// {/*<TouchableOpacity style={styles.orderButton} onPress={onSelect}>*/}
// {/*    <Text style={styles.buttonSelect}>Замовити</Text>*/}
// {/*</TouchableOpacity>*/}
