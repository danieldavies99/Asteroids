import { Anchor } from "two.js/src/anchor";
import { Group } from "two.js/src/group";
import { Path } from "two.js/src/path";

import { Actor } from "../engine/Actor";
import { normalizeAngle } from "../engine/Angles";
import { Vector } from "../engine/Vector";

import Colors from "../utils/Colors";

export class Bullet extends Actor {
  pos: Vector
  rotation: number
  dx: number
  dy: number

  private whiteSprite: Path
  private blueSprite: Path
  private redSprite: Path
  private spriteGroup: Group

  constructor(
    startPos: Vector,
    rotation: number
  ) {
    super()

    this.whiteSprite = this.generateSprite(Colors.white, 0)
    this.blueSprite = this.generateSprite(Colors.blue, 2)
    this.redSprite = this.generateSprite(Colors.red, -2)

    this.spriteGroup = new Group([
      this.redSprite,
      this.blueSprite,
      this.whiteSprite,
    ])

    this.graphics = this.spriteGroup;
    this.spriteGroup.scale = 0.7

    this.pos = new Vector(0,0)
    this.setPos(startPos)

    this.rotation = 0;
    this.setRotation(rotation)

    const totalVel = 0.5
    this.dx = totalVel * Math.cos(this.rotation - Math.PI * 0.5)
    this.dy = totalVel * Math.sin(this.rotation - Math.PI * 0.5) 
  }

  hideSprite = () => {
    this.whiteSprite.opacity = 0;
    this.blueSprite.opacity = 0;
    this.redSprite.opacity = 0;
  }

  showSprite = () => {
    this.whiteSprite.opacity = 1;
    this.blueSprite.opacity = 1;
    this.redSprite.opacity = 1;
  }
  
  isVisible = (): boolean => {
    return this.whiteSprite.opacity === 1;
  }

  generateSprite = (color: string, offset: number): Path => {
    const sprite = new Path([
      new Anchor(0,0),
      new Anchor(0, 25),
    ],
    true)
    sprite.noFill()
    sprite.stroke = color
    sprite.linewidth = 3
    sprite.join = 'round'
    sprite.position.x += offset
    return sprite
  }

  setRotation = (rotation: number) => {
    rotation = normalizeAngle(rotation)
    this.rotation = rotation;
    this.graphics.rotation = rotation;
  }

  getRotation = (): number => {
    return this.rotation
  }

  setPos = (pos: Vector) => {
    this.pos = pos;
    this.graphics.position.x = this.pos.x
    this.graphics.position.y = this.pos.y
  }

  isOffScreen = (screenWidth: number, screenHeight: number): boolean => {
    return this.pos.y > screenHeight 
      || this.pos.y < 0
      || this.pos.x > screenWidth
      || this.pos.x < 0
  }

  onUpdate = (_frameCount: number, delta: number) => {
    this.setPos(
      new Vector(
        this.pos.x + (this.dx * delta),
        this.pos.y + (this.dy * delta),
      )
    )
  };
}