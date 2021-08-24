import React from 'react';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';

const FirstScreen = ({navigation}) => {
  //  handle click
  const navigateLogin = () => {
    navigation.navigate('Login');
  };
  const navigateRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Layout style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        style={styles.gradient}
        colors={['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.0)']}
      />
      <Layout style={styles.containerImage}>
        <Image source={require('../assets/img/welcome-illustrator.png')} />
      </Layout>
      <Text style={styles.title} category="h5">
        Pelayanan Desa Semakin Mudah
      </Text>
      <Text style={styles.detail} category="p1">
        Kamu tetap bisa mendapat pelayanan desa walaupun dirumah.
      </Text>
      <Layout style={styles.containerButton}>
        <Button style={styles.button} size="giant" onPress={navigateRegister}>
          Buat Akun
        </Button>
        <Button
          style={styles.button}
          size="giant"
          status="basic"
          onPress={navigateLogin}>
          Masuk
        </Button>
      </Layout>
    </Layout>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  containerButton: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
  },
  button: {
    // borderRadius: 8,
    marginBottom: 14,
  },
  title: {
    alignSelf: 'center',
    fontWeight: '700',
    textAlign: 'center',
  },
  detail: {
    textAlign: 'center',
    fontSize: 16,
    color: '#808080',
    paddingHorizontal: 24,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    height: '40%',
    width: '120%',
  },
  containerImage: {
    paddingTop: 20,
    marginBottom: 20,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
});
