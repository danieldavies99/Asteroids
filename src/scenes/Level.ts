import { Arrow } from "../actors/Arrow";
import { Background } from "../actors/Background";
import { HealthBar } from "../actors/ui/HealthBar";
import { Score } from "../actors/ui/Score";
import { Engine } from "../engine/Engine";
import { Scene } from "../engine/Scene";
import { Timer } from "../engine/Timer";
import { Vector } from "../engine/Vector";
import { AsteroidTracker } from "../utils/AsteroidTracker";
import { BulletTracker } from "../utils/BulletTracker";
import Colors from "../utils/Colors";

export class Level extends Scene {
  constructor() {
    super('level')
  }

  private timer: Timer = new Timer(0)
  private asteroidIntervalLastUpdatedAt: number = 0

  private bulletTracker: BulletTracker = new BulletTracker()
  private asteroidTracker: AsteroidTracker = new AsteroidTracker()

  private score: Score = new Score(new Vector(0,0))
  private healthBar: HealthBar = new HealthBar(new Vector(0,0))

  private mousePos: Vector = new Vector(0,0)
  private player: Arrow = new Arrow(new Vector(0,0))

  initializeRenderingLayers = (engine: Engine) => {
    // define rendering layers
    engine.addRenderingLayer('background')
    engine.addRenderingLayer('bullets')
    engine.addRenderingLayer('foreground')
    engine.addRenderingLayer('UI')
  }

  initializeBackground = (engine: Engine) => {
    // create black background
    const bg = new Background(
      engine.getWidth(),
      engine.getHeight(),
      Colors.black
    );
    engine.add(bg, 'background')
  }

  initializeUi = (engine: Engine) => {
    // create UI elements
    this.healthBar = new HealthBar(
      new Vector(
        engine.getWidth() - 70,
        0
      )
    )
    this.score = new Score(
      new Vector(0,0)
    )
    engine.add(this.healthBar, 'UI')
    engine.add(this.score, 'UI')
  }

  initializePlayer = (engine: Engine) => {
    // create player
    this.player = new Arrow(new Vector(engine.getHalfWidth(), engine.getHalfHeight()))
    engine.add(this.player, 'foreground')
  }

  onInit = (engine: Engine) => {
    this.timer = new Timer(Date.now())
    this.asteroidIntervalLastUpdatedAt = 0;
  
    this.initializeRenderingLayers(engine)
    this.initializeBackground(engine);
    this.initializeUi(engine)
    this.initializePlayer(engine)

    this.asteroidTracker = new AsteroidTracker()
    this.bulletTracker = new BulletTracker()

    this.mousePos = new Vector(0, 0)

    engine.onPointerMove(evt => {
      this.mousePos = new Vector(evt.clientX, evt.clientY)
    })
  }

  /**
   * remove bullets from scene if they leave screen
   *
   * @param   {Engine}  engine  Engine instance
   *
   * @return  {void}            void
   */
  removeOutOfBoundsBullets = (engine: Engine): void => {
    this.bulletTracker.getBullets().forEach((bullet, _bulletIndex) => {
      // remove bullet if off screen
      if (
        bullet.isOffScreen(engine.getWidth(), engine.getHeight())
      ) {
        this.bulletTracker.removeBullet(bullet)
        engine.remove(bullet)
      }
    })
  }

  /**
   *  show bullet after it gets
   *  far enough away from player
   *  (bullets spawn in the middle
   *  of the player)
   *
   * @return  {void}  void
   */
  showBullets = (): void => {
    this.bulletTracker.getBullets().forEach(bullet => {

      if (bullet.pos.distanceTo(this.player.pos) > 40) {
        bullet.showSprite()
      }
    })
  }

  /**
   * Handle bullet / asteroid collision:
   * 
   * 1. reduce asteroid health
   * 2. if health is below 1, remove asteroid and add 1 to score
   *
   * @param   {Engine}  engine   engine instance
   *
   * @return  {void}             void
   */
  handleBulletAsteroidCollision = (engine: Engine): void => {
    this.bulletTracker.getBullets().forEach(bullet => {
      this.asteroidTracker.getAsteroids().forEach((asteroid) => {
        if (bullet.pos.distanceTo(asteroid.pos) < 35 && bullet.isVisible()) {
          engine.remove(bullet)
          this.bulletTracker.removeBullet(bullet)
          asteroid.health -= 1;
          if (asteroid.health < 1) {
            this.asteroidTracker.removeAsteroid(asteroid)
            engine.remove(asteroid)
            this.score.setScore(this.score.score + 1)
          }
        }
      })
    })
  }

  /**
   * Handle player / asteroid collision
   * 
   * 1. reduce player health
   * 2. if health is below 1, start end scene
   *
   * @param   {Engine}  engine  engine instance
   *
   * @return  {void}            void
   */
  handlePlayerAsteroidCollision = (engine: Engine) => {
    this.asteroidTracker.getAsteroids().forEach(asteroid => {
      if (asteroid.pos.distanceTo(this.player.pos) < 35) {
        this.healthBar.setHealth(this.healthBar.health - 1)
        this.asteroidTracker.removeAsteroid(asteroid)
        engine.remove(asteroid)
        if(this.healthBar.health < 1) { // game over
          const currentHighScore: number = engine.getState().highScore

          engine.setState({
            lastScore: this.score.score,
            highScore: this.score.score > currentHighScore ? this.score.score : currentHighScore
          })

          engine.startScene('gameOver')
        }
      }
    })
  }

  /**
   * Spawn bullets every x seconds
   *
   * @param   {Engine}  engine  engine instance
   *
   * @return  {void}            void
   */
  spawnBullets = (engine: Engine) => {
    if(this.bulletTracker.shouldSpawnNewBullet(this.timer.getElapsed())) {
      const bullet = this.bulletTracker.newBullet(
        this.player.pos,
        this.player.getRotation() + (-0.1 + Math.random() * 0.2),
        this.timer.getElapsed()
      )
      engine.add(bullet, 'bullets')
    }
  }
  
  /**
   * Spawn asteroids every x seconds
   *
   * @param   {Engine}  engine  engine instance
   *
   * @return  {void}            void
   */
  spawnAsteroids = (engine: Engine) => {
    if(this.asteroidTracker.shouldSpawnNewAsteroid(this.timer.getElapsed())) {
      const pos = this.player.pos.getRandomPointAtDistance(500)
      const asteroid = this.asteroidTracker.newAsteroid(pos, this.player, this.timer.getElapsed())
      engine.add(asteroid, 'foreground')
    }
  }

  /**
   * increase asteroid spawn rate every 8 seconds by 5 percent of current spawn rate
   *
   * @param   {Engine}  engine  engine instance
   *
   * @return  {void}            void
   */
  handleAsteroidSpawnRate = () => {
    if(this.timer.getElapsed() - this.asteroidIntervalLastUpdatedAt> 8000) {
      this.asteroidTracker.setSpawnInterval(this.asteroidTracker.getSpawnInterval()*0.95)
      this.asteroidIntervalLastUpdatedAt = this.timer.getElapsed()
    }
  }

  public onUpdate = (
    _frameCount: number,
    delta: number,
    engine: Engine
  ) => {
    // GameLoop: 
    this.timer.update(Date.now())
    this.removeOutOfBoundsBullets(engine)
    this.showBullets()
    this.handleBulletAsteroidCollision(engine)
    this.handlePlayerAsteroidCollision(engine)
    this.spawnBullets(engine)
    this.spawnAsteroids(engine)
    this.player.rotateTowards(this.mousePos, 0.005, delta, 0.1)
    this.handleAsteroidSpawnRate()
  }
}