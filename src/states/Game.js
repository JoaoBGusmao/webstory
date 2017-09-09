/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import { Player } from '../player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  constructor() {
    super();
    this.jumpTimer = 0;
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    
    this.game.physics.p2.restitution = 0;
    this.game.physics.p2.gravity.y = 2000;
    this.game.physics.p2.world.defaultContactMaterial.friction = 0;
    // this.game.physics.p2.world.setGlobalStiffness(1e5);

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    // Here we create the ground.
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = this.platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    });

    this.game.add.existing(this.player)
    this.game.camera.follow(this.player);
    this.game.physics.enable(this.player, Phaser.Physics.P2JS);

    // this.player.body.bounce = 0;
    // this.player.body.gravity = 2000;
    // this.player.body.friction = 0;
    // this.player.body.collideWorldBounds = true;
  }

  update() {
    var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}