import { Bullet } from "../actors/Bullet";
import { Vector } from "../engine/Vector";

export class BulletTracker {
  private bullets: Bullet[]

  constructor () {
    this.bullets = [];
  }

  newBullet = (
    pos: Vector,
    rotation: number,
  ): Bullet => {

    const bullet = new Bullet(pos,rotation)    
    bullet.hideSprite()
    this.bullets.push(bullet)
    return bullet
  }

  removeBullet = (bullet: Bullet) => {
    const index = this.bullets.findIndex(searchBullet => searchBullet.uuid === bullet.uuid)
    if(index < 0) {
      return;
    }
    this.bullets.splice(index, 1)
  }

  getBullets = (): Bullet[] => {
    return this.bullets;
  }
}