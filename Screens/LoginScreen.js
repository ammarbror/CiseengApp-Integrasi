import React, {useState, useContext} from 'react';
import {StyleSheet, Image, Alert, View, ScrollView} from 'react-native';
import {
  Button,
  Input,
  Layout,
  Text,
  Modal,
  Spinner,
  Icon,
} from '@ui-kitten/components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../utils/authContext';

const LoginScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState({
    name: '',
    nik: '',
    password: '',
  });
  const [caption, setCaption] = useState({
    name: '',
    password: '',
  });
  // Context Auth
  const {signIn} = useContext(AuthContext);
  //  handle click
  const navigateRegister = () => {
    navigation.navigate('Register');
  };
  const navigateHome = () => {
    setCaption({
      name: '',
      password: '',
      phone: '',
      address: '',
    });
    var config = {
      method: 'post',
      url: 'http://ciseeng-api.ammarabror.com/public/api/login-user',
      headers: {
        Accept: 'application/json',
      },
      data: data,
    };
    setVisible(true);
    axios(config)
      .then(function (response) {
        setVisible(false);
        // Save local storage signin and token
        console.log(response.data.token);
        AsyncStorage.setItem('token', response.data.token);
        signIn(response.data.token);
      })
      .catch(function (error) {
        setVisible(false);
        if (error.response.data.message === 'Nama atau NIK kamu salah') {
          setVisibleModal(true);
        } else {
          if (error.response.data.errors.name) {
            setCaption(prevState => ({
              ...prevState,
              name: 'Nama harus diisi.',
            }));
          } else if (error.response.data.errors.password) {
            setCaption(prevState => ({
              ...prevState,
              password: 'NIK harus diisi.',
            }));
          } else {
          }
        }
      });
  };

  const modal = () => (
    <Modal
      visible={visibleModal}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisibleModal(false)}>
      <View style={styles.containerModal}>
        <Icon
          fill="#FF4235"
          name="close-square-outline"
          style={{width: 64, height: 64}}
        />
        <Text
          style={{
            marginTop: 14,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Login tidak berhasil
        </Text>
        <Text style={{textAlign: 'center'}}>
          Nama atau NIK salah atau akun kamu belum tervalidasi.
        </Text>
      </View>
    </Modal>
  );

  const modalLoading = () => (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.containerModal}>
        <Spinner size="giant" />
        <Text style={{marginTop: 14}}>Mohon tunggu sebentar...</Text>
      </View>
    </Modal>
  );

  return (
    <Layout style={styles.container}>
      {modal()}
      {modalLoading()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout style={styles.containerImage}>
          <Image source={require('../assets/img/register-illustrator.png')} />
        </Layout>
        <Layout style={styles.containerTitle}>
          <Text style={styles.title} category="h5">
            Login
          </Text>
          <Text style={styles.detail} category="p1">
            Masukan nama dan nik kamu yang terdaftar
          </Text>
        </Layout>
        <Layout style={styles.containerInput}>
          <Input
            placeholder="Nama Kamu"
            size="large"
            style={
              caption.name
                ? [styles.input, {borderColor: '#FF4235'}]
                : styles.input
            }
            textStyle={styles.textInput}
            caption={caption.name}
            onChangeText={text =>
              setData(prevState => ({
                ...prevState,
                name: text,
              }))
            }
          />
          <Input
            placeholder="NIK"
            size="large"
            style={
              caption.password
                ? [styles.input, {borderColor: '#FF4235'}]
                : styles.input
            }
            textStyle={styles.textInput}
            caption={caption.password}
            keyboardType="phone-pad"
            onChangeText={text =>
              setData(prevState => ({
                ...prevState,
                nik: text,
                password: text,
              }))
            }
          />
          <Button style={styles.button} size="giant" onPress={navigateHome}>
            Masuk
          </Button>
          <Layout style={styles.containerLogin}>
            <Text style={styles.text}>Belum punya akun?</Text>
            <Button
              appearance="ghost"
              style={styles.buttonText}
              onPress={navigateRegister}>
              Buat Akun
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  containerButton: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
  },
  containerTitle: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  title: {
    fontWeight: '700',
  },
  detail: {
    fontSize: 16,
    color: '#808080',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    height: '50%',
    width: '120%',
  },
  containerInput: {
    width: '100%',
    marginTop: 16,
  },
  input: {
    borderWidth: 2,
    // borderColor: '#C1D7FF',
    // backgroundColor: 'rgba(255, 255, 255, 0.0)',
    marginBottom: 14,
    // borderRadius: 8,
  },
  textInput: {
    paddingVertical: 5,
  },
  button: {
    // borderRadius: 8,
    marginTop: 16,
  },
  containerImage: {
    paddingTop: 20,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    alignItems: 'center',
  },
  containerLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    paddingLeft: 0,
    marginLeft: -5,
  },
  text: {color: '#808080'},
  containerModal: {
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
