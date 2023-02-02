import { Anchor } from "two.js/src/anchor";
import { Group } from "two.js/src/group";
import { Path } from "two.js/src/path";
import { ArcSegment } from "two.js/src/shapes/arc-segment";

import { Actor } from "../../engine/Actor";
import { Vector } from "../../engine/Vector";

import Colors from "../../utils/Colors";

export class Heart extends Actor {
  pos: Vector

  private spriteGroup: Group

  constructor(
    startPos: Vector,

  ) {
    super()

    const circleOne = new ArcSegment(-5, 0, 0, 5, 0, -Math.PI - 0.3)
    circleOne.noStroke()
    circleOne.fill = Colors.black;

    const circleTwo = new ArcSegment(5, 0, 0, 5, 0.3, -Math.PI)
    circleTwo.noStroke()
    circleTwo.fill = Colors.black;
    const vertices = [
      new Anchor(9.2, 2.5),
      new Anchor(9, -1),
      new Anchor(-9, -1),
      new Anchor(-9.2, 2.5),
      new Anchor(0, 12),

    ]
    const triangle = new Path(vertices, true)
    triangle.noStroke()
    triangle.fill = Colors.black

    this.spriteGroup = new Group([
      circleOne,
      circleTwo,
      triangle
    ])

    this.graphics = this.spriteGroup;
    this.spriteGroup.scale = 0.7

    this.pos = new Vector(0,0)
    this.setPos(startPos)
  }

  hide = () => {
    this.spriteGroup.opacity = 0;
  }

  show = () => {
    this.spriteGroup.opacity = 1;
  }

  setPos = (pos: Vector) => {
    this.pos = pos;
    this.graphics.position.x = this.pos.x
    this.graphics.position.y = this.pos.y
  }

  onUpdate = (_frameCount: number, _delta: number) => {};
}