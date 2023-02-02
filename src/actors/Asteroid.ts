import { Anchor } from "two.js/src/anchor";
import { Group } from "two.js/src/group";
import { Path } from "two.js/src/path";

import { Actor } from "../engine/Actor";
import { Vector } from "../engine/Vector";

import Colors from "../utils/Colors";
import { Arrow } from "./Arrow";

export class Asteroid extends Actor {
  pos: Vector

  health: number

  private whiteSprite: Path
  private blueSprite: Path
  private redSprite: Path
  private spriteGroup: Group

  private rotationAmount: number

  bearingToTarget: number
  dx: number
  dy: number

  constructor(
    startPos: Vector,
    target: Arrow,
    velocity: number
  ) {
    super()

    const vertices = [ // clean octogon that then gets mushed
      new Anchor(-50, 0),
      new Anchor(-35, -35),
      new Anchor(0, -50),
      new Anchor(35, -35),
      new Anchor(50, 0),
      new Anchor(35, 35),
      new Anchor(0, 50),
      new Anchor(-35, 35),
    ]

    vertices.forEach((vertices: Anchor) => {
      vertices.x += -12.5 + (Math.random()*25)
      vertices.y += -12.5 + (Math.random()*25)
    })
    this.whiteSprite = this.generateSprite(Colors.white, 0, vertices)
    this.blueSprite = this.generateSprite(Colors.blue, 2, vertices)
    this.blueSprite.fill = Colors.black
    this.redSprite = this.generateSprite(Colors.red, -2, vertices)

    this.spriteGroup = new Group([
      this.redSprite,
      this.blueSprite,
      this.whiteSprite,
    ])

    this.graphics = this.spriteGroup;
    this.spriteGroup.scale = 0.7
    this.health = 3;

    this.setPos(startPos)

    this.rotationAmount = -0.015 + (Math.random() * 0.03)

    this.bearingToTarget = this.pos.bearingTo(target.pos)
    this.dx = velocity * Math.cos(this.bearingToTarget - Math.PI * 0.5)
    this.dy = velocity * Math.sin(this.bearingToTarget - Math.PI * 0.5) 
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

  onUpdate = (frameCount: number, delta: number) => {
    // console.log(this.rotationAmount)
    this.setPos(
      new Vector(
        this.pos.x + (this.dx * delta),
        this.pos.y + (this.dy * delta),
      )
    )
    this.spriteGroup.rotation += (this.rotationAmount)
  };
}