import {Modal, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

export function CustomModal({open, setOpen, children}) {
  return (
    <Modal
      isOpen={open}
      onMagicTap={() => {
        setOpen(false);
      }}
      onClose={() => setOpen(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
