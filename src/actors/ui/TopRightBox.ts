import { Anchor } from "two.js/src/anchor";
import { Group } from "two.js/src/group";
import { Path } from "two.js/src/path";

import { Actor } from "../../engine/Actor";
import { Vector } from "../../engine/Vector";

import Colors from "../../utils/Colors";

export class TopRightBox extends Actor {
  pos: Vector

  private whiteSprite: Path
  private blueSprite: Path
  private redSprite: Path
  private spriteGroup: Group

  constructor(
    startPos: Vector,

  ) {
    super()

    const vertices = [
      new Anchor(0, 0),
      new Anchor(120, 0),
      new Anchor(100, 40),
      new Anchor(0, 40),
    ]

    this.whiteSprite = this.generateSprite(Colors.white, 0, vertices)
    this.whiteSprite.fill = Colors.white;
    this.blueSprite = this.generateSprite(Colors.blue, 2, vertices)
    this.redSprite = this.generateSprite(Colors.red, -2, vertices)

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
    color: string,
    offset: number,
    vertices: Anchor[]
  ): Path => {
    const sprite = new Path(vertices,true)
    sprite.noFill()
    sprite.stroke = color
    sprite.linewidth = 3
    sprite.join = 'round'
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