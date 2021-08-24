import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';

const CardRiwayat = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigate(props.idRiwayat)}>
      <View
        style={[
          styles.block,
          {
            backgroundColor:
              props.status === 'Sedang Diproses'
                ? '#6690FF'
                : props.status === 'Pengajuan Ditolak'
                ? '#FF4235'
                : '#7EB509',
          },
        ]}
      />
      <View style={styles.containerContent}>
        <View style={styles.data}>
          <Text style={styles.title}>{props.jenisPelayanan}</Text>
          <Text style={styles.detail}>{props.nama}</Text>
          <Text style={styles.detail}>{props.published}</Text>
        </View>
        <View style={styles.containerRight}>
          <Text
            style={[
              styles.code,
              {
                color:
                  props.status === 'Sedang Diproses'
                    ? '#6690FF'
                    : props.status === 'Pengajuan Ditolak'
                    ? '#FF4235'
                    : '#7EB509',
              },
            ]}>{`#${props.kodeSurat}`}</Text>
          <View
            style={[
              styles.containerStatus,
              {
                backgroundColor:
                  props.status === 'Sedang Diproses'
                    ? '#6690FF'
                    : props.status === 'Pengajuan Ditolak'
                    ? '#FF4235'
                    : '#7EB509',
              },
            ]}>
            <Text style={styles.status}>{props.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardRiwayat;

const styles = StyleSheet.create({
  container: {
    height: 95,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8,
    marginBottom: 16,
  },
  containerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 14,
    paddingEnd: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#383838',
  },
  detail: {
    fontSize: 13,
    color: '#808080',
  },
  block: {
    backgroundColor: '#6690FF',
    height: '100%',
    width: 10,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  code: {
    fontSize: 13,
    color: '#6690FF',
    paddingEnd: 14,
    textAlign: 'right',
    marginBottom: 6,
  },
  status: {
    fontSize: 13,
    color: '#fff',
  },
  containerStatus: {
    backgroundColor: '#6690FF',
    paddingEnd: 14,
    paddingStart: 24,
    paddingVertical: 4,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  containerRight: {
    position: 'absolute',
    right: 0,
  },
});
