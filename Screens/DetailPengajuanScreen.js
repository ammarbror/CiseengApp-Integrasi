import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Text,
  Icon,
  Layout,
  Divider,
  Modal,
  Button,
} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';

const DetailPengajuanScreen = ({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const {data} = route.params;

  const [scrollNav, setScrollNav] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');

  const fixLabel = text => {
    text = text.replace(/_/g, ' ');
    return text.replace(/\w\S*/g, function (txt) {
      if (txt === 'nik' || txt === 'rt' || txt === 'rw') {
        return txt.toUpperCase();
      } else {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    });
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + d.getMonth(),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

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
      {modalImage()}
      <LinearGradient
        style={styles.gradient}
        colors={['#E0ECFF', 'rgba(255, 255, 255, 0.0)']}>
        {/* Header App */}
        <View
          style={
            scrollNav ? styles.containerHeaderScroll : styles.containerHeader
          }>
          <Icon
            fill="#292929"
            name="arrow-back"
            style={styles.iconBack}
            onPress={() => navigation.goBack()}
          />
          <Text category="h6" style={styles.titleHeader}>
            {`Detail ${data.jenis_pelayanan}`}
          </Text>
        </View>
      </LinearGradient>
      <ScrollView
        style={{paddingTop: '4%'}}
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y <= 0) {
            setScrollNav(false);
          } else {
            setScrollNav(true);
          }
        }}>
        <View style={styles.containerDetailCard}>
          <View style={styles.detailCard}>
            <View style={styles.containerData}>
              <Text style={styles.title}>Detail Status</Text>
              <View
                style={[
                  styles.containerStatus,
                  {
                    backgroundColor:
                      data.status_pengajuan === 'Sedang Diproses'
                        ? '#6690FF'
                        : data.status_pengajuan === 'Pengajuan Ditolak'
                        ? '#FF4235'
                        : '#7EB509',
                  },
                ]}>
                <Text style={styles.status}>{data.status_pengajuan}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <Text style={styles.detail}>{data.detail_status}</Text>
          </View>
          <View style={styles.detailCard}>
            <View style={[styles.containerData, {alignItems: 'center'}]}>
              <Text
                style={
                  styles.title
                }>{`Pengajuan ${data.jenis_pelayanan}`}</Text>
            </View>

            <Divider style={styles.divider} />
            {/* KODE PENGAJUAN */}
            <View style={styles.containerData}>
              <Text style={styles.label}>Kode pengajuan</Text>
              <Text
                style={
                  styles.code
                }>{`#${data.detail_pengajuan.kode_surat}`}</Text>
            </View>
            {Object.keys(data.detail_pengajuan).map((item, i) => {
              if (
                item === 'foto_ktp' ||
                item === 'foto_kk' ||
                item === 'foto_pengantar'
              ) {
              } else {
                if (
                  item === 'id' ||
                  item === 'pengajuan_id' ||
                  item === 'created_at' ||
                  item === 'updated_at' ||
                  item === 'kode_surat' ||
                  item === 'status_pengajuan'
                ) {
                } else {
                  return (
                    <View style={styles.containerData} key={i}>
                      <Text style={styles.label}>{fixLabel(item)}</Text>
                      <Text style={styles.data}>
                        {item.includes('tanggal')
                          ? formatDate(data.detail_pengajuan[item])
                          : data.detail_pengajuan[item]}
                      </Text>
                    </View>
                  );
                }
              }
            })}
            {/* TANGGAL */}
            <View style={styles.containerData}>
              <Text style={styles.label}>Tanggal Pengajuan</Text>
              <Text style={styles.data}>{data.published}</Text>
            </View>
          </View>
          <View style={[styles.detailCard, {marginBottom: '20%'}]}>
            <View style={[styles.containerData, {alignItems: 'center'}]}>
              <Text
                style={
                  styles.title
                }>{`Persyaratan ${data.jenis_pelayanan}`}</Text>
            </View>
            <Divider style={styles.divider} />
            <View>
              {Object.keys(data.detail_pengajuan).map((item, i) => {
                if (
                  item === 'foto_ktp' ||
                  item === 'foto_kk' ||
                  item === 'foto_pengantar'
                ) {
                  return (
                    <View key={i}>
                      <Text style={styles.labelPersyaratan}>
                        {fixLabel(item)}
                      </Text>
                      {/* <Image source={require()} /> */}
                      <TouchableOpacity
                        onPress={() => {
                          setVisible(true);
                          setUri(data.detail_pengajuan[item]);
                        }}>
                        <Image
                          style={styles.imagePersyaratan}
                          source={{uri: data.detail_pengajuan[item]}}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                }
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default DetailPengajuanScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
  },
  containerHeaderScroll: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 8,
    alignItems: 'center',
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
  },
  detailCard: {
    marginHorizontal: 20,
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
  containerData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
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
    flex: 2,
    lineHeight: 22,
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
  imagePersyaratan: {
    height: 150,
    borderRadius: 6,
    resizeMode: 'cover',
    marginTop: 6,
    marginBottom: 14,
  },
  labelPersyaratan: {
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#383838',
  },
  containerModal: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
