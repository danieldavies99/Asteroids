import { Group } from "two.js/src/group";
import { Text } from "two.js/src/text";

import { Actor } from "../../engine/Actor";
import { Vector } from "../../engine/Vector";

import Colors from "../../utils/Colors";

export class PromptText extends Actor {
  pos: Vector

  private whiteSprite: Text
  private blueSprite: Text
  private redSprite: Text
  private spriteGroup: Group

  constructor(
    startPos: Vector,
    message: string
  ) {
    super()

    this.whiteSprite = this.generateSprite(message, Colors.white, 0)
    this.whiteSprite.fill = Colors.white
    this.blueSprite = this.generateSprite(message, Colors.blue, 2)
    this.redSprite = this.generateSprite(message, Colors.red, -2)

    this.spriteGroup = new Group([
      this.redSprite,
      this.blueSprite,
      this.whiteSprite,
    ])

    this.graphics = this.spriteGroup;
    this.spriteGroup.scale = 0.7

    this.setPos(startPos)
  }

  generateSprite = (
    message: string,
    color: string,
    offset: number,
  ): Text => {
    const sprite = new Text(message, 0,0)
    sprite.size = 40
    sprite.fill = color;
    // sprite.noFill()
    // sprite.stroke = color
    // sprite.linewidth = 3
    sprite.noStroke()
    // sprite.join = 'round'
    sprite.position.x += offset
    return sprite
  }

  setPos = (pos: Vector) => {
    this.pos = pos;
    this.graphics.position.x = this.pos.x
    this.graphics.position.y = this.pos.y
  }

  onUpdate = (frameCount: number, delta: number) => {};
}