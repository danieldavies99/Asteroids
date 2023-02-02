import { Anchor } from "two.js/src/anchor";
import { Group } from "two.js/src/group";
import { Path } from "two.js/src/path";

import { Actor } from "../engine/Actor";
import { normalizeAngle } from "../engine/Angles";
import { Vector } from "../engine/Vector";

import Colors from "../utils/Colors";

export class Arrow extends Actor {
  pos: Vector
  private rotation: number
  
  private whiteSprite: Path
  private blueSprite: Path
  private redSprite: Path
  private spriteGroup: Group


  constructor(startPos: Vector) {
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
    this.setRotation(-0.02 + (Math.random() * 0.04))
  }

  generateSprite = (color: string, offset: number): Path => {
    const sprite = new Path([
      new Anchor(0,0),
      new Anchor(-25, 15),
      new Anchor(0,-35),
      new Anchor(25,15),
      new Anchor(0,0),
    ],
    true)
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

  setRotation = (rotation: number) => {
    rotation = normalizeAngle(rotation)
    this.rotation = rotation;
    this.graphics.rotation = rotation;
  }

  getRotation = (): number => {
    return this.rotation
  }

  rotateTowards = (
    target: Vector,
    speed: number,
    delta: number,
    deadzone: number
  ) => {
    const distanceClockwise = normalizeAngle(this.pos.bearingTo(target) - this.getRotation())
    const distanceAntiClockwise = (Math.PI * 2) - distanceClockwise 

    if(distanceAntiClockwise < deadzone && distanceAntiClockwise < deadzone) {
      return;
    }
    const currentRotation = this.getRotation()
    if(distanceClockwise < distanceAntiClockwise) {
      this.setRotation(currentRotation + speed * delta)
    } else {
      this.setRotation(currentRotation - speed * delta)
    }
  }

  onUpdate = (_frameCount: number, _delta: number) => {};
}