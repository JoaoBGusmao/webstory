import Phaser from 'phaser'
import { MapleKeyboard } from '../utils'

class Player extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    
    this.keyboard = new MapleKeyboard({
      game: this.game
    });

  }

  update () {
    var cursors = this.game.input.keyboard.createCursorKeys();
    var facing='left'
    var cursors = this.game.input.keyboard.createCursorKeys();

    this.body.velocity.x = 0;

    if (cursors.left.isDown) {
        this.body.velocity.x = -125;

        if (facing != 'left') {
            this.animations.play('left');
            facing = 'left';
        }
    } else if (cursors.right.isDown) {
        this.body.velocity.x = 125;

        if (facing != 'right') {
            this.animations.play('right');
            facing = 'right';
        }
    } else {
        if (facing != 'idle') {
            this.animations.stop();

            if (facing == 'left') {
                this.frame = 0;
            }
            else {
                this.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (this.keyboard.jumpButton.isDown && this.checkIfCanJump()) {
        this.body.moveUp(555);
        // this.jumpTimer = this.game.time.now + 750;
    }
  }

  checkIfCanJump() {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = this.game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === this.body.data || c.bodyB === this.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === this.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }
    
    return result;

}
}

export { Player }