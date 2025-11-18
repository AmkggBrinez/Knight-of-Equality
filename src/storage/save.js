import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const SAVE_KEY = 'knight_of_equality_save_v1';
const db = SQLite.openDatabase('knight.db');

export async function saveGame(state) {
  try {
    await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('AsyncStorage save failed, trying SQLite', e);
    try {
      db.transaction(tx => {
        tx.executeSql('create table if not exists saves (id integer primary key not null, data text);');
        tx.executeSql('delete from saves;');
        tx.executeSql('insert into saves (data) values (?);', [JSON.stringify(state)]);
      });
    } catch (e2) {
      console.warn('SQLite save failed too', e2);
    }
  }
}

export async function loadSave() {
  try {
    const s = await AsyncStorage.getItem(SAVE_KEY);
    if (s) return JSON.parse(s);
  } catch (e) {
    console.warn('AsyncStorage load failed', e);
  }
  // try sqlite
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql('select data from saves limit 1;', [], (_, { rows }) => {
        if (rows.length) {
          resolve(JSON.parse(rows._array[0].data));
        } else resolve(null);
      }, () => resolve(null));
    });
  });
}
