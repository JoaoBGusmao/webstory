import Phaser from 'phaser'

class MapleKeyboard extends Phaser.Keyboard {
  constructor ({ game }) {
    super(game)
    
    this.defineButtons()
  }

  defineButtons() {
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }
}

export { MapleKeyboard }