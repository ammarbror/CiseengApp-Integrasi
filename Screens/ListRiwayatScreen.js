import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout, Text, Icon} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import CardRiwayat from '../components/CardRiwayat';

const ListRiwayatScreen = ({route, navigation}) => {
  const [scrollNav, setScrollNav] = useState(false);
  const {data, name} = route.params;
  const navigateDetailPengajuan = i => {
    navigation.navigate('DetailPengajuan', {
      id: i,
      data: data[i].pengajuan,
    });
  };
  return (
    <Layout style={styles.container}>
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
            onPress={() => navigation.navigate('Home')}
          />
          <Text category="h6" style={styles.title}>
            Riwayat
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
            Selalu periksa status pengajuan kamu untuk mengetahui surat yang
            kamu buat telah selesai atau belum.
          </Text>
        </View>
        {/* Card Informasi*/}
        <View style={styles.containerList}>
          {data.length !== 0 ? (
            data.map((item, i) => {
              item = item.pengajuan;
              return (
                <CardRiwayat
                  key={i}
                  idRiwayat={i}
                  jenisPelayanan={item.jenis_pelayanan}
                  nama={name}
                  published={item.published}
                  kodeSurat={item.detail_pengajuan.kode_surat}
                  status={item.status_pengajuan}
                  navigate={navigateDetailPengajuan}
                />
              );
            })
          ) : (
            <Text style={{textAlign: 'center', paddingBottom: '20%'}}>
              Belum ada riwayat pengajuan...
            </Text>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default ListRiwayatScreen;

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
  containerCardInfo: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF7D3',
    marginHorizontal: 20,
    marginTop: '20%',
    borderRadius: 8,
  },
  iconAttention: {
    width: 21,
    height: 21,
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
  gradient: {
    position: 'absolute',
    top: 0,
    height: '50%',
    width: '120%',
  },
  title: {
    fontWeight: 'bold',
  },
  containerList: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: '15%',
  },
});
