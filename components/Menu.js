import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from '@ui-kitten/components';

const Menu = props => {
  return (
    <View style={styles.wrapMenu}>
      <TouchableOpacity
        style={styles.menu}
        onPress={() => props.navigate(props.idLayanan)}>
        <Icon style={styles.iconMenu} fill="#4A4A4A" name={props.icon} />
      </TouchableOpacity>
      <Text style={styles.menuTitle}>{props.title}</Text>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  wrapMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  iconMenu: {
    width: 28,
    height: 28,
  },
  menu: {
    width: 65,
    height: 65,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#E0ECFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
});
