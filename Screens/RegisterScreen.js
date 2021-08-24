import React, {useState} from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {
  Button,
  Input,
  Layout,
  Modal,
  Spinner,
  Text,
} from '@ui-kitten/components';
import axios from 'axios';

const RegisterScreen = ({navigation}) => {
  // STATE
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState({
    name: '',
    password: '',
    phone: '',
    address: '',
  });

  const [caption, setCaption] = useState({
    name: '',
    password: '',
    phone: '',
    address: '',
  });

  //  handle click
  const navigateRegister = () => {
    setCaption({
      name: '',
      password: '',
      phone: '',
      address: '',
    });
    setVisibleLoading(true);
    var config = {
      method: 'post',
      url: 'http://ciseeng-api.ammarabror.com/public/api/register-user',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setVisibleLoading(false);
        setVisibleModal(true);
      })
      .catch(function (error) {
        setVisibleLoading(false);
        if (error.response.data.errors.name) {
          setCaption(prevState => ({
            ...prevState,
            name: 'Nama harus diisi.',
          }));
        } else if (error.response.data.errors.password) {
          setCaption(prevState => ({
            ...prevState,
            password: 'NIK harus diisi atau NIK telah digunakan.',
          }));
        } else if (error.response.data.errors.phone) {
          setCaption(prevState => ({
            ...prevState,
            phone: 'Nomor harus diisi atau Nomor telah digunakan.',
          }));
        } else if (error.response.data.errors.address) {
          setCaption(prevState => ({
            ...prevState,
            address: 'Alamat harus diisi.',
          }));
        }
      });
  };

  const modal = () => (
    <Modal
      visible={visibleModal}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisibleModal(false)}>
      <View style={styles.containerModal}>
        <Text style={{fontSize: 32}}>✅</Text>
        <Text style={{marginTop: 14}}>Kamu berhasil membuat akun</Text>
      </View>
    </Modal>
  );

  const modalLoading = () => (
    <Modal visible={visibleLoading} backdropStyle={styles.backdrop}>
      <View style={styles.containerModal}>
        <Spinner size="giant" />
        <Text style={{marginTop: 14}}>Mohon tunggu sebentar...</Text>
      </View>
    </Modal>
  );

  return (
    <Layout style={styles.container}>
      {modalLoading()}
      {modal()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout style={styles.containerImage}>
          <Image source={require('../assets/img/register-illustrator.png')} />
        </Layout>
        <Layout style={styles.containerTitle}>
          <Text style={styles.title} category="h5">
            Register
          </Text>
          <Text style={styles.detail} category="p1">
            Lengkapi datamu untuk membuat akun
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
                password: text,
              }))
            }
          />
          <Input
            placeholder="Nomor Telepon"
            size="large"
            style={
              caption.phone
                ? [styles.input, {borderColor: '#FF4235'}]
                : styles.input
            }
            textStyle={styles.textInput}
            keyboardType="phone-pad"
            caption={caption.phone}
            onChangeText={text =>
              setData(prevState => ({
                ...prevState,
                phone: text,
              }))
            }
          />
          <Input
            placeholder="Alamat"
            size="large"
            style={
              caption.address
                ? [styles.input, {borderColor: '#FF4235'}]
                : styles.input
            }
            textStyle={styles.textInput}
            caption={caption.address}
            onChangeText={text =>
              setData(prevState => ({
                ...prevState,
                address: text,
              }))
            }
          />
          <Button style={styles.button} size="giant" onPress={navigateRegister}>
            Buat Akun
          </Button>
          <Layout style={styles.containerLogin}>
            <Text style={styles.gray}>Sudah punya akun?</Text>
            <Button
              appearance="ghost"
              style={styles.buttonText}
              textStyle={styles.text}
              onPress={() => navigation.navigate('Login')}>
              Masuk
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default RegisterScreen;

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
  button: {
    // borderRadius: 8,
    marginBottom: 14,
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
  text: {
    color: '#6690FF',
  },
  gray: {
    color: '#808080',
  },
  containerModal: {
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingVertical: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
