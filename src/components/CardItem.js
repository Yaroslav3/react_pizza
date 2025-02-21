import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export const CardItem = ({pizza, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <View style={styles.vl}>
        <Image style={styles.image} source={{uri: pizza.img}} />
        <Text style={styles.name}>{pizza.name}</Text>
        <Text style={styles.price}>{pizza.price} грн</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vl: {
    paddingTop: 10,
    width: 170,
  },
  btn: {
    width: '50%',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  name: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    height: 45,
  },
  price: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(179,232,157,0.14)',
    color: 'rgba(37,37,37,0.86)',
    fontWeight: 'bold',
  },
});
