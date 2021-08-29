import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  Divider,
  Button,
  Modal,
} from '@ui-kitten/components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import layanan from '../assets/data/Layanan';
import ItemStep from '../components/ItemStep';

const UploadScreen = ({route, navigation}) => {
  // props from navigation
  const {id, data, token} = route.params;
  const [scrollNav, setScrollNav] = useState(false);
  const [dataUpload, setDataUpload] = useState(layanan[id].fillUpload);
  const [visibleModal, setvisibleModal] = useState(false);
  const [pick, setPick] = useState();
  const [dataStore, setDataStore] = useState(Object.assign(data, dataUpload));
  const [caption, setCaption] = useState(layanan[id].fill);

  const navigateConfirm = i => {
    var check = 0;
    Object.keys(layanan[id].fillUpload).map((item, i) => {
      if (dataUpload[item]) {
        setCaption(prevState => ({
          ...prevState,
          [item]: '',
        }));
        check += 1;
      } else {
        setCaption(prevState => ({
          ...prevState,
          [item]: 'Harus upload dokumen.',
        }));
      }
    });
    if (check === Object.keys(layanan[id].fillUpload).length) {
      navigation.navigate('Confirm', {id: i, data: dataStore, token: token});
    }
    // navigation.navigate('Confirm', {id: i, data: dataStore, token: token});
  };

  const setPersyaratan = () => {
    return layanan[id].informasi.persyaratan.map((item, i) => (
      <ItemStep key={i} step={item.id} content={item.syarat} />
    ));
  };

  const uploadType = (value, fill, i) => {
    return (
      <View style={styles.containerInput} key={i}>
        <Text style={styles.label}>{value}</Text>
        <TouchableOpacity
          style={
            dataUpload[fill]
              ? [styles.containerUpload, {backgroundColor: '#E0ECFF'}]
              : caption[fill]
              ? [
                  styles.containerUpload,
                  {borderColor: '#FF4235', borderWidth: 1.5},
                ]
              : styles.containerUpload
          }
          onPress={() => {
            setvisibleModal(true);
            setPick(value);
          }}>
          <Icon
            style={styles.iconCamera}
            fill="#8F9BB3"
            name={dataUpload[fill] ? 'done-all' : 'camera'}
          />
        </TouchableOpacity>
        <Text style={styles.caption}>
          {dataUpload[fill] ? '' : caption[fill] ? caption[fill] : ''}
        </Text>
      </View>
    );
  };

  function setFillDataUpload(uri, label) {
    setDataUpload(prevState => ({
      ...prevState,
      [label]: uri,
    }));
  }

  const takePhoto = kind => {
    launchCamera(
      {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        // quality: 1,
      },
      response => {
        setvisibleModal(false);
        if (response.didCancel) {
        } else if (response.errorCode) {
        } else {
          if (kind === 'Foto KK') {
            setFillDataUpload(response.assets[0], 'foto_kk');
          } else if (kind === 'Foto KTP') {
            setFillDataUpload(response.assets[0], 'foto_ktp');
          } else {
            setFillDataUpload(response.assets[0], 'foto_pengantar');
          }
        }
      },
    );
  };

  const pickFormLibrary = kind => {
    launchImageLibrary(
      {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        // quality: 1,
      },
      response => {
        setvisibleModal(false);
        if (response.didCancel) {
        } else if (response.errorCode) {
        } else {
          if (kind === 'Foto KK') {
            setFillDataUpload(response.assets[0], 'foto_kk');
          } else if (kind === 'Foto KTP') {
            setFillDataUpload(response.assets[0], 'foto_ktp');
          } else {
            setFillDataUpload(response.assets[0], 'foto_pengantar');
          }
          setvisibleModal(false);
        }
      },
    );
  };

  const modal = () => (
    <Modal
      visible={visibleModal}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setvisibleModal(false)}>
      <View visible={false} style={styles.containerModal}>
        <Text style={styles.textModal} category="h6">
          Upload Photo
        </Text>
        <View style={styles.modalUpload}>
          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.upload, {marginRight: 8}]}
            onPress={() => takePhoto(pick)}>
            <Icon style={styles.iconCamera} fill="#8F9BB3" name="camera" />
            <Text style={styles.hintUpload}>Ambil Gambar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upload}
            onPress={() => pickFormLibrary(pick)}>
            <Icon style={styles.iconCamera} fill="#8F9BB3" name="image" />
            <Text style={styles.hintUpload}>Dari Gallery</Text>
          </TouchableOpacity>
        </View>
        <Button
          size="medium"
          appearance="ghost"
          onPress={() => setvisibleModal(false)}>
          Cancel
        </Button>
      </View>
    </Modal>
  );

  return (
    <Layout style={styles.container}>
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
            <Text category="h6" style={styles.title}>
              {layanan[id].jenisLayanan}
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.circleOn} />
            <View style={styles.line} />
            <View style={styles.circleOn} />
            <View style={styles.line} />
            <View style={styles.circleOff} />
          </View>
        </View>
      </View>
      <ScrollView
        style={{zIndex: -1, paddingVertical: '4%'}}
        showsVerticalScrollIndicator={false}
        // detect Scroll
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y <= 0) {
            setScrollNav(false);
          } else {
            setScrollNav(true);
          }
        }}>
        {/* Card Prosedur & Persyaratan */}
        <View style={styles.containerCardInfo}>
          <View style={styles.containerHeaderMenu}>
            <Text style={styles.title} category="h6">
              Persyaratan
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.cardInfo}>
            <View>{setPersyaratan()}</View>
          </View>
        </View>
        <View style={styles.containerForm}>
          <View style={styles.containerHeaderMenu}>
            <Text style={styles.title} category="h6">
              Upload Persyaratan
            </Text>
          </View>
          <Divider style={styles.divider} />
          {layanan[id].upload.map((item, i) =>
            uploadType(item.label, item.fill, i),
          )}
        </View>
        <Button
          style={styles.button}
          size="large"
          onPress={() => {
            // var fill = Object.assign(data, dataUpload);
            // storeData(prevState => ({
            //   ...prevState,
            //   ...fill,
            // }));
            navigateConfirm(id);
          }}>
          Selanjutnya
        </Button>
      </ScrollView>
      {modal()}
    </Layout>
  );
};

export default UploadScreen;

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
    marginTop: '20%',
    borderRadius: 8,
  },
  iconAttention: {
    width: 21,
    height: 21,
  },
  iconCamera: {
    width: 26,
    height: 26,
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
  containerForm: {
    marginTop: 24,
  },
  containerStep: {
    marginTop: 16,
    marginBottom: '15%',
  },
  label: {
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 6,
    fontSize: 15,
  },
  containerHeaderMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardInfo: {
    paddingHorizontal: 4,
  },
  containerInput: {
    marginBottom: 14,
  },
  divider: {
    marginBottom: 14,
  },
  inputAddres: {
    textAlignVertical: 'top',
    borderWidth: 2,
  },
  input: {
    borderWidth: 2,
  },
  containerUpload: {
    paddingVertical: '10%',
    borderRadius: 6,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 14,
    marginBottom: '10%',
  },
  // backdrop: {
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  containerModal: {
    width: 280,
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingVertical: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderRadius: 5,
  },
  modalUpload: {
    flexDirection: 'row',
    width: '100%',
  },
  upload: {
    flex: 1,
    paddingVertical: '10%',
    borderRadius: 6,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintUpload: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8F9BB3',
    marginTop: 6,
  },
  textModal: {
    fontWeight: 'bold',
    marginBottom: 14,
  },
  // containerModal: {
  //   backgroundColor: 'white',
  //   paddingHorizontal: '10%',
  //   paddingVertical: '10%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   elevation: 25,
  //   borderRadius: 5,
  // },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  caption: {
    fontSize: 12,
    color: '#FF4235',
  },
});
