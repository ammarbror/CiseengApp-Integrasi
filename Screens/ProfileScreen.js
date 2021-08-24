import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  Icon,
  Layout,
  Button,
  Input,
  Modal,
  Spinner,
  styled,
} from '@ui-kitten/components';
import {AuthContext} from '../utils/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// TODO: SIGNOUT DAN EDIT
const ProfileScreen = ({navigation, route}) => {
  const {dataUser, token} = route.params;
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    name: null,
    phone: null,
    address: null,
  });
  const {signOut} = useContext(AuthContext);

  const EditProfile = () => {
    setVisibleEdit(true);
    Object.keys(dataEdit).map((item, i) => {
      if (dataEdit[item]) {
      } else {
        setDataEdit(prevState => ({
          ...prevState,
          [item]: dataUser[item],
        }));
      }
    });
  };

  const StoreEdit = () => {
    var data = JSON.stringify(dataEdit);

    var config = {
      method: 'post',
      url: `http://ciseeng-api.ammarabror.com/public/api/users/edit-user/${dataUser.id}?_method=PUT`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        navigation.navigate('Home', {token: token});
      })
      .catch(function (error) {});
  };

  const input = (label, value, item, i) => (
    <View style={styles.containerInput} key={i}>
      <Text style={styles.label}>{label}</Text>
      <Input
        placeholder={value}
        size="large"
        onChangeText={text =>
          setDataEdit(prevState => ({
            ...prevState,
            [item]: text,
          }))
        }
      />
    </View>
  );

  const modalEdit = () => (
    <Modal
      visible={visibleEdit}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisibleEdit(false)}>
      <View style={styles.containerModal}>
        <Text style={{marginTop: 14, textAlign: 'center'}}>
          Apakah kamu yakin ingin mengubah data kamu ?
        </Text>
        <View style={{flexDirection: 'row', marginTop: 24}}>
          <Button
            appearance="outline"
            style={{marginRight: 24, flex: 1}}
            onPress={() => StoreEdit()}>
            Yakin
          </Button>
          <Button
            status="danger"
            size="small"
            style={{flex: 1}}
            onPress={() => setVisibleEdit(false)}>
            Tidak
          </Button>
        </View>
      </View>
    </Modal>
  );

  const modalLogout = () => (
    <Modal
      visible={visibleLogout}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisibleLogout(false)}>
      <View style={styles.containerModal}>
        <Text style={{marginTop: 14, textAlign: 'center'}}>
          Apakah kamu yakin ingin keluar ?
        </Text>
        <View style={{flexDirection: 'row', marginTop: 24}}>
          <Button
            appearance="outline"
            style={{marginRight: 24, flex: 1}}
            onPress={() => Logout()}>
            Yakin
          </Button>
          <Button
            status="danger"
            size="small"
            style={{flex: 1}}
            onPress={() => setVisibleLogout(false)}>
            Tidak
          </Button>
        </View>
      </View>
    </Modal>
  );

  const inputDisabled = (label, value, i) => (
    <View style={styles.containerInput} key={i}>
      <Text style={styles.label}>{label}</Text>
      <Input key={i} placeholder={value} size="large" disabled={true} />
    </View>
  );

  const Logout = () => {
    AsyncStorage.setItem('token', '');
    signOut();
  };

  return (
    <Layout style={styles.containerAll}>
      {modalEdit()}
      {modalLogout()}
      <View>
        <View style={styles.containerHeader}>
          <View style={styles.buttonBack}>
            <Icon
              fill="#292929"
              name="arrow-back"
              style={styles.iconBack}
              onPress={() => navigation.goBack()}
            />
            <Text category="h6" style={styles.titleHeader}>
              Profile
            </Text>
          </View>
          <Button
            style={styles.buttonLogout}
            size="small"
            status="danger"
            appearance="ghost"
            accessoryLeft={() => (
              <Icon fill="#FF4235" name="log-out" style={styles.iconLogout} />
            )}
            onPress={() => setVisibleLogout(true)}>
            KELUAR
          </Button>
        </View>
        <View style={styles.containerImageProfile}>
          <View style={styles.imageProfile}>
            <Icon fill="#6690FF" name="person" style={styles.iconProfile} />
          </View>
        </View>
        <View style={styles.containerEdit}>
          {Object.keys(dataUser).map((item, i) => {
            var label = item.charAt(0).toUpperCase() + item.slice(1);

            if (item === 'name' || item === 'phone' || item === 'address') {
              return input(label, dataUser[item], item, i);
            } else if (item === 'nik') {
              return inputDisabled(label, dataUser[item], i);
            } else {
            }
          })}
          <Button
            style={styles.button}
            size="large"
            onPress={() => EditProfile()}>
            Simpan
          </Button>
        </View>
      </View>
    </Layout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  containerAll: {
    height: '100%',
  },
  containerHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleHeader: {
    fontWeight: 'bold',
  },
  iconBack: {
    marginRight: 8,
    width: 28,
    height: 28,
  },
  iconLogout: {
    width: 16,
    height: 16,
  },
  iconProfile: {
    width: 100,
    height: 100,
  },
  imageProfile: {
    padding: 5,
    backgroundColor: '#E0ECFF',
    borderRadius: 100,
    borderWidth: 1.8,
    borderColor: '#6690FF',
    elevation: 3,
  },
  buttonBack: {
    flexDirection: 'row',
  },
  buttonLogout: {
    marginRight: -20,
  },
  containerImageProfile: {
    alignItems: 'center',
    marginVertical: 16,
  },
  containerInput: {
    marginBottom: 14,
  },
  label: {
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 4,
    fontSize: 14,
  },
  containerEdit: {
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 14,
    marginBottom: '10%',
  },
  containerModal: {
    backgroundColor: 'white',
    paddingHorizontal: '8%',
    paddingVertical: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
