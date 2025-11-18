import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Player from './game/player';
import Enemy from './game/enemy';
import Physics from './game/systems/physics';
import InputSystem from './game/systems/input';
import HUD from './ui/HUD';
import Controls from './ui/Controls';
import SettingsModal from './ui/SettingsModal';
import { loadSave } from './storage/save';

export default function App() {
  const engine = useRef(null);
  const [entities, setEntities] = useState({});
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await loadSave();
      const player = Player.create({ x: 80, y: 200, id: 'player', saved });
      const enemy = Enemy.create({ x: 300, y: 200, id: 'enemy1' });
      setEntities({
        physics: { physics: true, renderer: null },
        player,
        enemy
      });
    })();
  }, []);

  const systems = [InputSystem, Physics];

  const onEvent = (e) => {
    if (e.type === 'GAME_OVER') {
      // simple reset
      engine.current.swap({ ...entities, player: Player.create({ x:80,y:200,id:'player' }) });
    }
    if (e.type === 'OPEN_SETTINGS') setSettingsVisible(true);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={engine}
        style={styles.game}
        systems={systems}
        entities={entities}
        onEvent={onEvent}
        running={true}
      />
      <HUD engine={engine} />
      <Controls onInput={(cmd) => engine.current.dispatch({ type: 'INPUT', payload: cmd })} />
      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#0b0610' },
  game: { position:'absolute', left:0, right:0, top:0, bottom:0 }
});
