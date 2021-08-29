/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  Button,
  Modal,
  Spinner,
} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';

// data menu
import layanan from '../assets/data/Layanan';
import Menu from '../components/Menu';
import CardInfo from '../components/CardInfo';
import CardRiwayat from '../components/CardRiwayat';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
  // GET DATA

  const isFocused = useIsFocused();
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (error) {}
      getUser(userToken);
      getPengajuan(userToken);
      setToken(userToken);
    };
    setVisible(false);
    bootstrapAsync();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const [visible, setVisible] = useState(true);
  const [scrollNav, setScrollNav] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [pengajuan, setPengajuan] = useState([]);
  const [token, setToken] = useState('');

  // TODO: GET TOKEN

  const getUser = userToken => {
    var config = {
      method: 'get',
      url: 'http://ciseeng-api.ammarabror.com/public/api/users/show-user',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios(config)
      .then(function (response) {
        return setDataUser(response.data);
      })
      .catch(function (error) {});
  };

  const getPengajuan = userToken => {
    var config = {
      method: 'get',
      url: `http://ciseeng-api.ammarabror.com/public/api/pengajuan-user`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios(config)
      .then(function (response) {
        return setPengajuan(response.data.data.slice(0).reverse());
      })
      .catch(function (error) {});
  };

  // add menu
  const setMenu = (start, end) => {
    const arr = [];
    for (let index = start; index < end; index++) {
      arr.push(
        <Menu
          key={index}
          idLayanan={index}
          icon={layanan[index].icon}
          title={layanan[index].jenisLayanan}
          navigate={navigateForm}
        />,
      );
    }
    return arr;
  };
  // add cardInfo
  const setCardInfo = end => {
    const arr = [];
    for (let index = 0; index < end; index++) {
      arr.push(
        <CardInfo
          key={index}
          idLayanan={index}
          title={layanan[index].jenisLayanan}
          detail={layanan[index].informasi.detail}
          navigate={navigateStep}
        />,
      );
    }
    return arr;
  };

  // handle navigate
  const navigateInfo = () => {
    navigation.navigate('Info');
  };
  const navigateListMenu = () => {
    navigation.navigate('ListMenu', {token: token});
  };
  const navigateDetailPengajuan = i => {
    navigation.navigate('DetailPengajuan', {
      id: i,
      data: pengajuan[i].pengajuan,
    });
  };
  const navigateListRiwayat = () => {
    navigation.navigate('ListRiwayat', {
      data: pengajuan,
      name: dataUser.name,
    });
  };
  const navigateStep = i => {
    navigation.navigate('Step', {id: i});
  };
  const navigateForm = i => {
    navigation.navigate('Form', {id: i, token: token});
  };
  const navigateProfile = () => {
    navigation.navigate('Profile', {dataUser: dataUser, token: token});
  };

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
      <StatusBar translucent backgroundColor="transparent" />
      {dataUser.name ? (
        <>
          <LinearGradient
            style={styles.gradient}
            colors={['#E0ECFF', 'rgba(255, 255, 255, 0.0)']}>
            {/* Header App */}
            <View
              style={
                scrollNav
                  ? styles.containerHeaderScroll
                  : styles.containerHeader
              }>
              <Text
                category="h5"
                style={[
                  styles.title,
                  {fontSize: 20, flex: 2, marginRight: 10},
                ]}>
                {dataUser.name ? `Hallo, ${dataUser.name} 👋🏼` : `Hallo 👋🏼`}
              </Text>
              <TouchableOpacity
                style={{
                  padding: 3.5,
                  backgroundColor: '#E0ECFF',
                  borderRadius: 20,
                  borderWidth: 1.8,
                  borderColor: '#6690FF',
                  elevation: 3,
                }}
                onPress={navigateProfile}>
                <Icon fill="#6690FF" name="person" style={styles.iconRiwayat} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <ScrollView
            style={{paddingTop: '10%'}}
            showsVerticalScrollIndicator={false}
            onScroll={event => {
              if (event.nativeEvent.contentOffset.y <= 0) {
                setScrollNav(false);
              } else {
                setScrollNav(true);
              }
            }}>
            <View style={styles.padding}>
              {/* Info */}
              <View style={styles.containerCardInfo}>
                <View style={styles.containerInfo}>
                  <Icon
                    style={styles.iconAttention}
                    fill="#4A4A4A"
                    name="info-outline"
                  />
                  <Text style={styles.infoTitle}>Perhatian</Text>
                </View>
                <Text style={styles.infoDetail}>
                  {`Hai, ${dataUser.name} Jangan lupa untuk selalu membaca dan menyiapkan setiap prosedur dan persyaratan untuk memudahkan kamu.`}
                </Text>
              </View>
              {/* SubMenu Pelayanan*/}
              <View style={styles.containerHeaderMenu}>
                <Text style={styles.title} category="h6">
                  Pelayanan
                </Text>
                <Button size="small" onPress={navigateListMenu}>
                  Lihat Semua
                </Button>
              </View>
              {/* Menu Pelayanan */}
              <View>
                {/* Row 1 */}
                <View style={styles.containerMenu}>{setMenu(0, 4)}</View>
              </View>
              {/* SubMenu Informasi*/}
              <View style={styles.containerHeaderMenu}>
                <Text style={styles.title} category="h6">
                  Informasi
                </Text>
                <Button size="small" onPress={navigateInfo}>
                  Lihat Semua
                </Button>
              </View>
              <View>{setCardInfo(3)}</View>
              {/* SubMenu Riwayat*/}
              <View style={styles.containerHeaderMenu}>
                <Text style={styles.title} category="h6">
                  Riwayat
                </Text>
                <Button size="small" onPress={navigateListRiwayat}>
                  Lihat Semua
                </Button>
              </View>
              {pengajuan.length !== 0 ? (
                <View style={styles.containerCard}>
                  {pengajuan.map((item, i) => {
                    item = item.pengajuan;
                    if (i >= 3) {
                      return;
                    } else {
                      return (
                        <CardRiwayat
                          key={i}
                          idRiwayat={i}
                          jenisPelayanan={item.jenis_pelayanan}
                          nama={dataUser.name}
                          published={item.published}
                          kodeSurat={item.detail_pengajuan.kode_surat}
                          status={item.status_pengajuan}
                          navigate={navigateDetailPengajuan}
                        />
                      );
                    }
                  })}
                </View>
              ) : (
                <View>
                  <Text style={{textAlign: 'center', paddingBottom: '20%'}}>
                    Belum ada riwayat pengajuan...
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      ) : (
        modalLoading()
      )}
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  padding: {
    paddingHorizontal: 20,
  },
  containerHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E0ECFF',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerHeaderScroll: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    zIndex: 1,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerHeaderMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  containerCardInfo: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF7D3',
    marginTop: '20%',
    borderRadius: 8,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    height: '50%',
    width: '100%',
  },
  containerInfo: {
    flexDirection: 'row',
  },
  infoTitle: {
    fontWeight: '700',
    marginLeft: 6,
    color: '#4A4A4A',
  },
  infoDetail: {
    marginTop: 2,
    paddingHorizontal: 4,
    fontSize: 13,
    color: '#4a4a4a',
    lineHeight: 17,
    letterSpacing: 0.5,
  },
  containerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  iconRiwayat: {
    width: 26,
    height: 26,
  },
  iconAttention: {
    width: 21,
    height: 21,
  },
  containerCard: {
    marginBottom: '15%',
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
