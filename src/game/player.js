import React from 'react';
import { View, Text } from 'react-native';

const create = ({ x=0, y=0, id='player', saved=null }) => {
  return {
    id,
    position: { x, y },
    size: { w: 48, h: 48 },
    vel: { x:0, y:0 },
    grounded: false,
    health: saved?.health ?? 5,
    maxHealth:5,
    attackCooldown:0,
    renderer: <PlayerSprite />
  };
};

const PlayerSprite = (props) => {
  const p = props;
  const style = {
    position:'absolute',
    left: p.position?.x ?? 0,
    top: p.position?.y ?? 0,
    width: p.size.w,
    height: p.size.h,
    backgroundColor: '#c7d2fe',
    borderRadius: 6,
    alignItems:'center',
    justifyContent:'center'
  };
  return (
    <View style={style}>
      <Text style={{fontSize:10,color:'#030712'}}>K</Text>
    </View>
  );
};

export default { create };
