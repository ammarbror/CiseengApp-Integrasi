import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Icon,
  Layout,
  Divider,
  Button,
  Modal,
  Spinner,
} from '@ui-kitten/components';
import layanan from '../assets/data/Layanan';
import axios from 'axios';

const ConfirmScreen = ({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  // all data from route
  const {data, id, token} = route.params;
  const [scrollNav, setScrollNav] = useState(false);
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');

  const fixLabel = text => {
    text = text.replace(/_/g, ' ');
    return text.replace(/\w\S*/g, function (txt) {
      if (txt === 'nik') {
        return txt.toUpperCase();
      } else {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    });
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('-');
  }

  function formatDateStore(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  const navigateHome = () => {
    navigation.navigate('Home', {token: token});
  };

  const modalLoading = () => (
    <Modal visible={visibleLoading} backdropStyle={styles.backdrop}>
      <View style={styles.containerModal}>
        <Spinner size="giant" />
        <Text style={{marginTop: 14}}>Mohon tunggu sebentar...</Text>
      </View>
    </Modal>
  );

  const modal = () => (
    <Modal visible={visibleModal} backdropStyle={styles.backdrop}>
      <View style={styles.containerModal}>
        <Text style={{fontSize: 32}}>✅</Text>
        <Text style={{marginTop: 14}}>Kamu berhasil membuat pengajuan</Text>
      </View>
    </Modal>
  );

  // TODO: SUBMIT DATA TO API & VALIDASI FORM
  const storeData = () => {
    var dataStore = new FormData();
    var fillStore = Object.values(data);
    var labelStore = Object.keys(data);
    fillStore.map((item, i) => {
      if (
        labelStore[i] === 'foto_kk' ||
        labelStore[i] === 'foto_ktp' ||
        labelStore[i] === 'foto_pengantar'
      ) {
        dataStore.append(labelStore[i], {
          uri: item.uri,
          type: item.type,
          name: item.fileName,
        });
      } else if (
        labelStore[i] === 'tanggal_lahir' ||
        labelStore[i] === 'tanggal_lahir_anak' ||
        labelStore[i] === 'tanggal_lahir_ayah' ||
        labelStore[i] === 'tanggal_lahir_ibu'
      ) {
        dataStore.append(labelStore[i], formatDateStore(item));
      } else if (
        labelStore[i] === 'permohonan' ||
        labelStore[i] === 'jenis_kelamin' ||
        labelStore[i] === 'agama' ||
        labelStore[i] === 'pekerjaan' ||
        labelStore[i] === 'pekerjaan_ayah' ||
        labelStore[i] === 'agama_ayah' ||
        labelStore[i] === 'pekerjaan_ibu' ||
        labelStore[i] === 'agama_ibu' ||
        labelStore[i] === 'status'
      ) {
        dataStore.append(labelStore[i], item[labelStore[i]]);
      } else {
        dataStore.append(labelStore[i], item);
      }
    });
    console.log(dataStore);
    var url = '';
    if (layanan[id].jenisLayanan === 'Ressi KTP') {
      url = 'http://ciseeng-api.ammarabror.com/public/api/pengajuan/sk-ktp';
    } else if (layanan[id].jenisLayanan === 'Surat SKKM') {
      url = 'http://ciseeng-api.ammarabror.com/public/api/pengajuan/sk-km';
    } else if (layanan[id].jenisLayanan === 'Surat SKTM') {
      url = 'http://ciseeng-api.ammarabror.com/public/api/pengajuan/sk-tm';
    } else if (layanan[id].jenisLayanan === 'Surat SKU') {
      url = 'http://ciseeng-api.ammarabror.com/public/api/pengajuan/sk-usaha';
    } else if (layanan[id].jenisLayanan === 'Surat SKD') {
      url =
        'http://ciseeng-api.ammarabror.com/public/api/pengajuan/sk-domisili';
    } else if (layanan[id].jenisLayanan === 'Keterangan Kelahiran') {
      url =
        'http://ciseeng-api.ammarabror.com/public/api/pengajuan/sk-kelahiran';
    } else if (layanan[id].jenisLayanan === 'Pengantar SKCK') {
      url = 'http://ciseeng-api.ammarabror.com/public/api/pengajuan/sk-ck';
    }
    var config = {
      method: 'post',
      url: url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: dataStore,
    };
    setVisibleLoading(true);
    axios(config)
      .then(function (response) {
        setVisibleLoading(false);
        setVisibleModal(true);
        setTimeout(() => {
          navigateHome();
        }, 1500);
      })
      .catch(function (error) {
        setVisibleLoading(false);
        console.log(error);
        Alert.alert('Periksa Jaringanmu');
      });
  };

  const modalImage = () => (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      <View>
        <Image
          style={{
            width: windowWidth - 50,
            height: windowWidth,
            resizeMode: 'contain',
            borderRadius: 5,
          }}
          source={{
            uri: uri,
          }}
        />
      </View>
    </Modal>
  );

  return (
    <Layout style={styles.container}>
      {modalLoading()}
      {modal()}
      {modalImage()}
      <View style={styles.gradient}>
        <View
          style={[
            scrollNav ? styles.containerHeaderScroll : styles.containerHeader,
            {justifyContent: 'space-between'},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Icon
              fill="#292929"
              name="arrow-back"
              style={styles.iconBack}
              onPress={() => navigation.goBack()}
            />
            <Text category="h6" style={{fontWeight: 'bold'}}>
              {layanan[id].jenisLayanan}
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.circleOn} />
            <View style={styles.line} />
            <View style={styles.circleOn} />
            <View style={styles.line} />
            <View style={styles.circleOn} />
          </View>
        </View>
      </View>
      <ScrollView
        style={{zIndex: -1, paddingVertical: '4%'}}
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y <= 0) {
            setScrollNav(false);
          } else {
            setScrollNav(true);
          }
        }}>
        {/* Detail Card */}
        <View style={[styles.containerDetailCard, {marginHorizontal: -15}]}>
          <View style={styles.detailCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <Text style={styles.title}>Data Pengajuan</Text>
              <Button
                size="small"
                // status="basic"
                appearance="outline"
                accessoryLeft={() => (
                  <Icon
                    fill="#6690FF"
                    name="edit-outline"
                    style={{width: 20, height: 20}}
                  />
                )}
                onPress={() =>
                  navigation.navigate('EditForm', {
                    id: id,
                    pengajuan: data,
                    token: token,
                  })
                }>
                Edit
              </Button>
            </View>

            <Divider style={styles.divider} />
            {/* JENIS PELAYANAN */}
            <View style={styles.containerData}>
              <Text style={styles.label}>Jenis Pelayanan</Text>
              <Text style={styles.data}>{layanan[id].jenisLayanan}</Text>
            </View>
            {Object.keys(data).map((item, i) => {
              if (
                item === 'foto_ktp' ||
                item === 'foto_kk' ||
                item === 'foto_pengantar'
              ) {
              } else {
                return (
                  <View style={styles.containerData} key={i}>
                    <Text style={styles.label}>{fixLabel(item)}</Text>
                    <Text style={styles.data}>
                      {item.includes('tanggal')
                        ? formatDate(data[item])
                        : item === 'permohonan' ||
                          item === 'jenis_kelamin' ||
                          item === 'agama' ||
                          item === 'pekerjaan' ||
                          item === 'pekerjaan_ayah' ||
                          item === 'agama_ayah' ||
                          item === 'pekerjaan_ibu' ||
                          item === 'agama_ibu' ||
                          item === 'status'
                        ? data[item][item]
                        : data[item]}
                    </Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
        <View
          style={[
            styles.containerDetailCard,
            {marginHorizontal: -15, marginTop: '2%'},
          ]}>
          <View style={styles.detailCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <Text style={styles.title}>Dokumen Persyaratan</Text>
              <Button
                size="small"
                // status="basic"
                appearance="outline"
                accessoryLeft={() => (
                  <Icon
                    fill="#6690FF"
                    name="edit-outline"
                    style={{width: 20, height: 20}}
                  />
                )}
                onPress={() =>
                  navigation.navigate('EditUpload', {
                    id: id,
                    data: data,
                    token: token,
                  })
                }>
                Edit
              </Button>
            </View>
            <Divider style={styles.divider} />
            {/* JENIS PELAYANAN */}
            <View>
              {Object.keys(data).map((item, i) => {
                if (
                  item === 'foto_ktp' ||
                  item === 'foto_kk' ||
                  item === 'foto_pengantar'
                ) {
                  return (
                    <View key={i}>
                      <Text style={styles.data}>{fixLabel(item)}</Text>
                      {/* <Image source={require()} /> */}
                      <TouchableOpacity
                        onPress={() => {
                          setVisible(true);
                          setUri(data[item].uri);
                        }}>
                        <Image
                          style={styles.imagePersyaratan}
                          source={{uri: data[item].uri}}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  return;
                }
              })}
            </View>
          </View>
        </View>
        <Button style={styles.button} size="large" onPress={() => storeData()}>
          Ajukan
        </Button>
      </ScrollView>
    </Layout>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },
  containerHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  containerHeaderScroll: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 8,
    alignItems: 'center',
  },
  containerData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  iconBack: {
    marginRight: 8,
    width: 28,
    height: 28,
  },
  titleHeader: {
    fontWeight: 'bold',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    height: '50%',
    width: '120%',
  },
  containerDetailCard: {
    marginTop: '20%',
    paddingHorizontal: 20,
  },
  detailCard: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#383838',
  },
  divider: {
    marginVertical: 10,
  },
  label: {
    flex: 1.6,
    fontSize: 13,
    color: '#808080',
  },
  data: {
    flex: 2,
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#383838',
  },
  code: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6690FF',
  },
  status: {
    fontSize: 13,
    color: '#fff',
  },
  containerStatus: {
    backgroundColor: '#6690FF',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  detail: {
    fontSize: 13,
    color: '#808080',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    zIndex: 20,
  },
  circleOn: {
    width: 16,
    height: 16,
    backgroundColor: '#6690FF',
    borderRadius: 25,
  },
  circleOff: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#6690FF',
    borderRadius: 25,
  },
  line: {
    height: 2,
    width: 14,
    backgroundColor: '#6690FF',
  },
  button: {
    marginTop: 14,
    marginBottom: '10%',
  },
  containerModal: {
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingVertical: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  imagePersyaratan: {
    height: 150,
    borderRadius: 6,
    resizeMode: 'cover',
    marginTop: 6,
    marginBottom: 14,
  },
});
