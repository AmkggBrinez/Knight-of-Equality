const gravity = 0.6;
export default (entities, { time }) => {
  const keys = Object.keys(entities);
  for (let k of keys) {
    const e = entities[k];
    if (!e || !e.position) continue;
    // simple physics integration
    if (!e.grounded) {
      e.vel.y += gravity;
      e.position.y += e.vel.y;
    } else {
      e.position.y += e.vel.y;
    }
    e.position.x += e.vel.x || 0;

    // ground collision (simple)
    if (e.position.y >= 260) {
      e.position.y = 260;
      e.vel.y = 0;
      e.grounded = true;
    }

    // clamp positions
    if (e.position.x < 0) e.position.x = 0;
    if (e.position.x > 760) e.position.x = 760;
  }

  // simple collision: player attack hits enemy
  const player = Object.values(entities).find(en => en.id === 'player');
  const enemy = Object.values(entities).find(en => en.id && en.id.startsWith('enemy'));
  if (player && enemy) {
    // attack if attackCooldown > 0 used as attack signal
    if (player.attackSignal) {
      const dx = Math.abs((player.position.x + player.size.w/2) - (enemy.position.x + enemy.size.w/2));
      const dy = Math.abs((player.position.y + player.size.h/2) - (enemy.position.y + enemy.size.h/2));
      const hitRange = 60;
      if (dx < hitRange && dy < 40) {
        enemy.health -= 1;
        player.attackSignal = false;
      }
    }
    // enemy simple damage to player on touch
    const overlapX = Math.abs((player.position.x + player.size.w/2) - (enemy.position.x + enemy.size.w/2)) < (player.size.w+enemy.size.w)/2;
    const overlapY = Math.abs((player.position.y + player.size.h/2) - (enemy.position.y + enemy.size.h/2)) < (player.size.h+enemy.size.h)/2;
    if (overlapX && overlapY) {
      // damage
      if (!player._hurtCooldown) {
        player.health -= 1;
        player._hurtCooldown = 60;
        if (player.health <= 0) {
          // emit game over event later via entities._engine?
          if (entities._engine && entities._engine.dispatch) {
            entities._engine.dispatch({ type: 'GAME_OVER' });
          }
        }
      }
    }
    if (enemy.health <= 0) {
      // remove enemy
      delete entities[enemy.id];
      // narrative event placeholder
      if (entities._engine && entities._engine.dispatch) {
        entities._engine.dispatch({ type: 'ENEMY_DEFEATED', payload: { reason: enemy.symbolicMeaning || 'unknown' }});
      }
    }
  }

  // reduce hurt cooldowns and attack cooldowns
  if (player) {
    if (player._hurtCooldown) player._hurtCooldown--;
    if (player.attackCooldown && player.attackCooldown>0) player.attackCooldown--;
  }

  return entities;
};
