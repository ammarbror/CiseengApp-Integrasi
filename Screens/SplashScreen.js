import React from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.containerAll}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image style={styles.image} source={require('../assets/img/bloob.png')} />
      <Text style={styles.title}>Ciseeng App</Text>
      <Text style={styles.developer}>Developer by Incremental Studios 👨🏻‍💻</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  containerAll: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: '20%',
  },
  image: {
    position: 'absolute',
    top: '15%',
  },
  developer: {
    position: 'absolute',
    bottom: '5%',
    color: '#2E3A59',
  },
});
