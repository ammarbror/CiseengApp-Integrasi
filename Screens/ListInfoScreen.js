import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout, Text, Icon} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import layanan from '../assets/data/Layanan';
import CardInfo from '../components/CardInfo';

const ListInfoScreen = ({navigation}) => {
  const [scrollNav, setScrollNav] = useState(false);
  // handle
  const navigateStep = i => {
    navigation.navigate('Step', {id: i});
  };

  const setCardInfo = () => {
    return layanan.map((data, i) => (
      <CardInfo
        key={i}
        idLayanan={i}
        title={data.jenisLayanan}
        detail={data.informasi.detail}
        navigate={navigateStep}
      />
    ));
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
            Informasi Pelayanan
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
        <View style={styles.containerListInformasi}>{setCardInfo()}</View>
      </ScrollView>
    </Layout>
  );
};

export default ListInfoScreen;

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
    lineHeight: 16,
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
  containerListInformasi: {
    marginTop: 24,
    marginBottom: '15%',
  },
});
