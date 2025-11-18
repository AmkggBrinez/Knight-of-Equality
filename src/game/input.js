export default (entities, { events }) => {
  // events can be dispatched via engine.dispatch
  if (events && events.length) {
    events.forEach(e => {
      if (e.type === 'INPUT') {
        const payload = e.payload;
        const player = Object.values(entities).find(en => en.id === 'player');
        if (!player) return;
        if (payload === 'LEFT') {
          player.vel.x = -2;
        } else if (payload === 'RIGHT') {
          player.vel.x = 2;
        } else if (payload === 'STOP_X') {
          player.vel.x = 0;
        } else if (payload === 'JUMP') {
          if (player.grounded) {
            player.vel.y = -10;
            player.grounded = false;
          }
        } else if (payload === 'ATTACK') {
          if (!player.attackCooldown || player.attackCooldown<=0) {
            player.attackSignal = true;
            player.attackCooldown = 30;
          }
        }
      }
    });
  }
  return entities;
};
