import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Icon} from '@ui-kitten/components';

const CardMenu = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigate(props.idLayanan)}>
      <View style={styles.containerIcon}>
        <Icon style={styles.iconMenu} fill="#4A4A4A" name={props.icon} />
      </View>
      <View style={styles.containerContent}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.detail}>{props.detail}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardMenu;

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
  containerIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D6E4FF',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  iconMenu: {
    width: 35,
    height: 35,
  },
  containerContent: {
    flex: 2.5,
    justifyContent: 'center',
    paddingHorizontal: 14,
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
  icon: {
    width: 60,
    height: 60,
  },
});
