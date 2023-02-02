import { Arrow } from "../actors/Arrow";
import { Background } from "../actors/Background";
import { HealthBar } from "../actors/ui/HealthBar";
import { ScoreText } from "../actors/ui/ScoreText";
import { TopRightBox } from "../actors/ui/TopRightBox";
import { Engine } from "../engine/Engine";
import { Scene } from "../engine/Scene";
import { Vector } from "../engine/Vector";
import { AsteroidTracker } from "../utils/AsteroidTracker";
import { BulletTracker } from "../utils/BulletTracker";
import Colors from "../utils/Colors";

export class Level extends Scene {
  constructor() {
    super('level')
  }

  private bulletTracker: BulletTracker
  private asteroidTracker: AsteroidTracker

  private scoreText: ScoreText
  private healthBar: HealthBar

  private mousePos: Vector
  private player: Arrow

  onInit = (engine: Engine) => {
    // define rendering layers
    engine.addGraphicLayer('background')
    engine.addGraphicLayer('bullets')
    engine.addGraphicLayer('foreground')
    engine.addGraphicLayer('UI')

    // create black background
    const bg = new Background(
      engine.getWidth(),
      engine.getHeight(),
      Colors.black
    );
    engine.add(bg, 'background')

    // create UI elements
    const topRight = new TopRightBox(new Vector(0, 0));
    this.scoreText = new ScoreText(new Vector(37, 16))
    this.healthBar = new HealthBar(
      new Vector(
        engine.getWidth() - 70,
        0
      )
    )
    engine.add(this.healthBar, 'UI')
    engine.add(topRight, 'UI')
    engine.add(this.scoreText, 'UI')

    // create player
    this.player = new Arrow(new Vector(engine.getHalfWidth(), engine.getHalfHeight()))
    engine.add(this.player, 'foreground')

    this.asteroidTracker = new AsteroidTracker()
    this.bulletTracker = new BulletTracker()

    this.mousePos = new Vector(0, 0)

    engine.onPointerMove(evt => {
      this.mousePos = new Vector(evt.clientX, evt.clientY)
    })
  }

  public onUpdate = (
    frameCount: number,
    delta: number,
    engine: Engine
  ) => {
    //  handle bullet show/hide/remove
    this.bulletTracker.getBullets().forEach((bullet, bulletIndex) => {
      // remove bullet if off screen
      if (
        bullet.isOffScreen(engine.getWidth(), engine.getHeight())
      ) {
        this.bulletTracker.removeBullet(bullet)
        engine.remove(bullet)
      }

      // show bullet after it gets
      // far enough away from player
      // (bullets spawn in the middle
      // of the player)
      if (bullet.pos.distanceTo(this.player.pos) > 40) {
        bullet.showSprite()
      }
    })

    // handle bullet/asteroid collision
    this.bulletTracker.getBullets().forEach((bullet, bulletIndex) => {
      this.asteroidTracker.getAsteroids().forEach((asteroid) => {
        if (bullet.pos.distanceTo(asteroid.pos) < 35 && bullet.isVisible()) {
          engine.remove(bullet)
          this.bulletTracker.removeBullet(bullet)
          asteroid.health -= 1;
          if (asteroid.health < 1) {
            this.asteroidTracker.removeAsteroid(asteroid)
            engine.remove(asteroid)
            this.scoreText.setScore(this.scoreText.score + 1)
          }
        }
      })
    })

    // handle player/asteroid collision
    this.asteroidTracker.getAsteroids().forEach(asteroid => {
      if (asteroid.pos.distanceTo(this.player.pos) < 35) {
        this.healthBar.setHealth(this.healthBar.health - 1)
        this.asteroidTracker.removeAsteroid(asteroid)
        engine.remove(asteroid)
        if(this.healthBar.health < 1) {
          engine.startScene('gameOver')
        }
      }
    })

    // spawn bullets
    if(this.bulletTracker.shouldSpawnNewBullet(frameCount)) {
      const bullet = this.bulletTracker.newBullet(
        this.player.pos,
        this.player.getRotation() + (-0.1 + Math.random() * 0.2),
        frameCount
      )
      engine.add(bullet, 'bullets')
    }

    // spawn asteroids 
    if(this.asteroidTracker.shouldSpawnNewAsteroid(frameCount)) {
      const pos = this.player.pos.getRandomPointAtDistance(500)
      const asteroid = this.asteroidTracker.newAsteroid(pos, this.player, frameCount)
      engine.add(asteroid, 'foreground')
    }

    this.player.rotateTowards(this.mousePos, 0.005, delta, 0.1)
  }
}