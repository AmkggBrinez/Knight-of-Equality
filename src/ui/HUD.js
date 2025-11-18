import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HUD({ engine }) {
  // engine may be a ref, try to show static placeholders
  const health = 5;
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.header}>
        <Text style={{color:'white', fontWeight:'bold'}}>Knight of Equality</Text>
      </View>
      <View style={styles.healthBar}>
        <View style={[styles.healthFill, { width: '100%' }]} />
      </View>
      <View style={styles.dialogue}>
        <Text style={{color:'white'}}>"Equality is the strength that heals."</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position:'absolute', left:12, right:12, top:12 },
  header: { marginBottom:6 },
  healthBar: { height: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, overflow:'hidden', marginBottom:8 },
  healthFill: { height:'100%', backgroundColor:'rgba(255,50,50,0.9)' },
  dialogue: { backgroundColor:'rgba(0,0,0,0.5)', padding:8, borderRadius:8 }
});
