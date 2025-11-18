import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Controls({ onInput }) {
  return (
    <View style={styles.controls} pointerEvents="box-none">
      <View style={styles.leftGroup}>
        <TouchableOpacity onPressIn={() => onInput('LEFT')} onPressOut={() => onInput('STOP_X')} style={styles.btn}><Text>◀</Text></TouchableOpacity>
        <TouchableOpacity onPressIn={() => onInput('RIGHT')} onPressOut={() => onInput('STOP_X')} style={styles.btn}><Text>▶</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => onInput('JUMP')} style={styles.btn}><Text>⤴</Text></TouchableOpacity>
      </View>
      <View style={styles.rightGroup}>
        <TouchableOpacity onPress={() => onInput('ATTACK')} style={styles.attackBtn}><Text>Attack</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: { position: 'absolute', left: 10, right: 10, bottom: 12, flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  leftGroup: { flexDirection: 'row', gap: 8 },
  rightGroup: {},
  btn: { width: 56, height: 56, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', marginRight:8 },
  attackBtn: { minWidth: 86, height: 56, borderRadius: 12, backgroundColor: 'rgba(255,0,0,0.08)', alignItems: 'center', justifyContent: 'center' }
});
