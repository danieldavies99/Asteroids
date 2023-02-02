import { Group } from "two.js/src/group";

import { Actor } from "../../engine/Actor";
import { Vector } from "../../engine/Vector";
import { Heart } from "./Heart";
import { TopLeftBox } from "./TopLeftBox";


export class HealthBar extends Actor {
  pos: Vector

  heart1: Heart
  heart2: Heart
  heart3: Heart

  box: TopLeftBox

  health: number

  private spriteGroup: Group

  constructor(
    startPos: Vector,
  ) {
    super()

    this.box = new TopLeftBox(new Vector(0, 0));
    
    this.heart1 = new Heart(new Vector(12,13))
    this.heart2 = new Heart(new Vector(32,13))
    this.heart3 = new Heart(new Vector(52,13))

    this.spriteGroup = new Group([
      this.box.graphics,
      this.heart1.graphics,
      this.heart2.graphics,
      this.heart3.graphics
    ])

    this.graphics = this.spriteGroup
    this.health = 3
    this.setPos(startPos)
  }

  setHealth = (health: number) => {
    this.health = health;
    switch (health) {
      case 0:
        this.heart1.hide()
        this.heart2.hide()
        this.heart3.hide()
        break;
      case 1:
        this.heart1.show()
        this.heart2.hide()
        this.heart3.hide()
        break;
      case 2:
        this.heart1.show()
        this.heart2.show()
        this.heart3.hide()
        break;
      case 3:
        this.heart1.show()
        this.heart2.show()
        this.heart3.show()
        break;
      default:
        this.heart1.show()
        this.heart2.show()
        this.heart3.hide()
        break;
    }
  }

  setPos = (pos: Vector) => {
    this.pos = pos;
    this.graphics.position.x = this.pos.x
    this.graphics.position.y = this.pos.y
  }

  onUpdate = (frameCount: number, delta: number) => {};
}