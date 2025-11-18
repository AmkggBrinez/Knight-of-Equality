import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SettingsModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.back}>
        <View style={styles.card}>
          <Text style={{fontWeight:'bold',fontSize:18}}>Settings</Text>
          <Text style={{marginTop:8}}>Audio: On</Text>
          <Text>Controls: Large</Text>
          <TouchableOpacity onPress={onClose} style={styles.btn}><Text>Close</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  back: { flex:1, backgroundColor:'rgba(0,0,0,0.6)', alignItems:'center', justifyContent:'center' },
  card: { width:300, padding:16, backgroundColor:'#0b0610', borderRadius:8 },
  btn: { marginTop:12, backgroundColor:'rgba(255,255,255,0.06)', padding:8, borderRadius:6, alignItems:'center' }
});
