import { Bullet } from "../actors/Bullet";
import { Vector } from "../engine/Vector";

export class BulletTracker {
  private bullets: Bullet[]
  private lastBulletSpawnedAt: number
  private bulletInterval: number

  constructor () {
    this.bullets = [];
    this.bulletInterval = 15;
    this.lastBulletSpawnedAt = 0;
  }

  shouldSpawnNewBullet = (framesElapsed: number): boolean => {
    if (framesElapsed - this.lastBulletSpawnedAt >= this.bulletInterval) {
      return true;
    }
    return false
  }

  newBullet = (
    pos: Vector,
    rotation: number,
    framesElapsed: number
  ): Bullet => {

    const bullet = new Bullet(pos,rotation)    
    bullet.hideSprite()
    this.bullets.push(bullet)
    this.lastBulletSpawnedAt = framesElapsed
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