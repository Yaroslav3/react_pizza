import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList, Image, TouchableOpacity, Alert,
} from 'react-native';
import {RootState} from '../store/storeReducerPizza.tsx';
import ArrowLeftIcon from '../util/icon/ArrowLeftIcon.tsx';
import ArrowRightIcon from '../util/icon/ArrowRightIcon.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {increaseQuantity, decreaseQuantity, Pizza, clearCart} from '../store/storeActionPizza.tsx';
import EmptyOrder from "../../assets/svg/order-empty";

export interface DataPizzaList {
  pizza: Pizza;
  quantity: number;
}

const BasketScreen: React.FC = () => {
  const dispatch = useDispatch();
  const stateSelect: Array<DataPizzaList> = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = stateSelect.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0);

  const handleIncreaseQuantity = (item: DataPizzaList) => {
    dispatch(increaseQuantity(item.pizza));
  };

  const handleDecreaseQuantity = (item: DataPizzaList) => {
    dispatch(decreaseQuantity(item.pizza));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const orderCreate = () => {
    Alert.alert(
        'Замовлення підтверджено',
        'Дякую Ви замовили піцу з доставкою',
        [
          {text: 'ОК', onPress: handleClearCart},
        ],
    );
  };
  const orderCreateWithYou = () => {
    Alert.alert(
        'Замовлення підтверджено',
        'Дякую Ви замовили піцу з собою!!!',
        [
          {text: 'ОК', onPress: handleClearCart},
        ],
    );
  };

  // Функція рендеру елементів
  const renderItem = ({item}: {item: DataPizzaList}) => (
      <View style={styles.itemContainer}>
        <View style={styles.infoOrder}>
          <Image style={styles.modalImage} source={{ uri: item.pizza.img }} />
        </View>
        <View style={styles.details}>
          <View>
            <Text style={styles.pizzaName}>{item.pizza.name}</Text>
            <Text >{item.pizza.description}</Text>
          </View>
          <View style={styles.priceContainerInfo}>
            <View style={styles.priceAll}>
              <Text style={styles.priceAll_text}>
                {new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(item.pizza.price * item.quantity)}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <TouchableOpacity style={styles.arrowButton} onPress={() => handleDecreaseQuantity(item)}>
                <ArrowLeftIcon />
              </TouchableOpacity>
              <Text style={styles.count}>{item.quantity}</Text>
              <TouchableOpacity style={styles.arrowButton}  onPress={() => handleIncreaseQuantity(item)}>
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  );

  return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {stateSelect.length > 0 ? (
            <>
              <View style={styles.btnOrder}>
                <Text style={styles.btnOrderDelivery} onPress={() => orderCreate()}>Доставка</Text>
                <Text style={styles.btnOrderWithYou} onPress={() => orderCreateWithYou()}> З собою</Text>
              </View>
              <View style={styles.textInfo}>
                <Text style={styles.textInfoP}>Ваше замовлення:</Text>
                <Text style={styles.textInfoPt}>Мінімальна сума для безкоштовної доставки 285 грн.</Text>
              </View>

              <FlatList
                  data={stateSelect}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.pizza.id.toString()}
                  contentContainerStyle={styles.content}
              />
              <View style={styles.finish}>
              <Text style={styles.finishInfo}>Сума до сплати: </Text>
              <Text style={styles.finishValue}>
                {new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(totalPrice)}</Text>
            </View>
            </>
        ) : (
            <>
              <View style={styles.empty}>
                <Text style={styles.emptyMessage}>Ваш кошик порожній</Text>
                <EmptyOrder style={styles.emptyMessageIcon} width={200} height={200} />
              </View>
            </>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  btnOrder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnOrderDelivery: {
    borderRadius: 10,
    width: '45%',
    backgroundColor: 'rgba(37,37,37,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(37,37,37,0.24)',
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
    height: 45,
    fontSize: 18,
  },
  btnOrderWithYou: {
    borderRadius: 10,
    width: '45%',
    backgroundColor: 'rgb(255,207,92)',
    borderWidth: 1,
    borderColor: 'rgba(37,37,37,0.24)',
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
    height: 45,
    fontSize: 18,
  },
  textInfo: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(166,166,166,0.38)',
  },
  textInfoP: {
    fontSize: 20,
    textAlign: 'left',
  },
  textInfoPt: {
    fontSize: 13,
    textAlign: 'left',
    color: 'rgb(78,77,77)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  content: {
    width: '100%',
    paddingBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyMessageIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoOrder: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    paddingRight: 10,
    paddingTop: 20,
  },
  details: {
    flex: 3,
  },
  priceContainerInfo: {
    flexDirection: 'row',
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    backgroundColor: 'rgba(85,85,85,0.22)',
    padding: 5,
    borderRadius: 10,
  },
  arrowButton: {
    padding: 5,
  },
  count: {
    fontSize: 13,
    textAlign: 'center',
    minWidth: 30,
  },
  pizzaName: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 40,
  },
  priceAll: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    gap: 10,
  },
  priceAll_text: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  finish: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 50,
    justifyContent: 'flex-end',
  },
  finishInfo: {
    fontSize: 16,
  },
  finishValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 10,
    paddingRight: 20,
  },
});

export default BasketScreen;


//
// const removeAllItems = () => {
//   Alert.alert(
//     'Очистити кошик?',
//     'Ви впевнені, що хочете видалити всі піци з кошика?',
//     [
//       {text: 'Скасувати', style: 'cancel'},
//       {text: 'Очистити', onPress: clearCart},
//     ],
//   );
// };
// const orderCreate = () => {
//   Alert.alert(
//       'Замовлення підтверджено',
//       'Ви замовили піцу',
//       [
//         {text: 'ОК', onPress: clearCart},
//       ],
//   );
// }
// {/*<Text style={styles.text}>Ваш кошик</Text>*/}
// {/*{cart.length ? (*/}
// {/*  <>*/}
// {/*    <TouchableOpacity  style={styles.order} onPress={orderCreate}>*/}
// {/*      <Text style={styles.orderButtonText}>Оформити замовлення</Text>*/}
// {/*    </TouchableOpacity>*/}
// {/*    <View style={styles.totalContainer}>*/}
// {/*      <Text style={styles.totalText}>Сума до сплати:</Text>*/}
// {/*      <Text style={styles.totalValue}>{cart.reduce((sum, item) => sum + (parseFloat(item.pizza.price) * item.quantity), 0).toFixed(2)} грн</Text>*/}
// {/*    </View>*/}
// {/*    <FlatList*/}
// {/*      data={cart}*/}
// {/*      renderItem={renderItem}*/}
// {/*      keyExtractor={item => item.pizza.id.toString()}*/}
// {/*    />*/}
//
// {/*    <TouchableOpacity style={styles.clearButton} onPress={removeAllItems}>*/}
// {/*      <Text style={styles.clearButtonText}>Очистити кошик</Text>*/}
// {/*    </TouchableOpacity>*/}
// {/*  </>*/}
// {/*) : (*/}
// {/*  <Text>Ваш кошик порожній</Text>*/}
// {/*)}*/}
