import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';

const CardInfo = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigate(props.idLayanan)}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require('../assets/img/task-illustrator.png')}
        />
      </View>
      <View style={styles.containerContent}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.detail}>{props.detail}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  container: {
    height: 95,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8,
    marginBottom: 16,
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7D3',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
  },
  containerContent: {
    flex: 2.5,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#383838',
  },
  detail: {
    fontSize: 13,
    color: '#808080',
  },
});
