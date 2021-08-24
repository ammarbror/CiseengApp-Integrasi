import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';

const ItemStep = props => {
  return (
    <View>
      {/* PERSYARATAN */}
      <View style={styles.containerStep}>
        <View style={styles.boxNumber}>
          <Text style={styles.textBox}>{props.step}</Text>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.content}>{props.content}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemStep;

const styles = StyleSheet.create({
  containerStep: {
    marginTop: 16,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
  },
  boxNumber: {
    position: 'absolute',
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: '#6690FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 1,
    elevation: 3,
  },
  textBox: {
    fontWeight: 'bold',
    color: '#fff',
  },
  containerContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingLeft: 24,
    elevation: 2,
  },
  content: {
    color: '#4A4A4A',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
