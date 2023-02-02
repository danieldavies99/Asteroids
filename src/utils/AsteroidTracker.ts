import { Arrow } from "../actors/Arrow";
import { Asteroid } from "../actors/Asteroid";
import { Vector } from "../engine/Vector";

export class AsteroidTracker {
  private asteroids: Asteroid[]
  private lastAsteroidSpawnedAt: number
  private asteroidSpawnInterval: number

  constructor () {
    this.asteroids = [];
    this.asteroidSpawnInterval = 100
    this.lastAsteroidSpawnedAt = 0;
  }

  newAsteroid = (
    pos: Vector,
    target: Arrow,
    framesElapsed: number
  ): Asteroid => {
    const asteroid = new Asteroid(
        pos,
        target,
        0.1
    )
    this.asteroids.push(asteroid)
    this.lastAsteroidSpawnedAt = framesElapsed
    return asteroid;
  }

  shouldSpawnNewAsteroid = (framesElapsed: number): boolean => {
    if (framesElapsed - this.lastAsteroidSpawnedAt >= this.asteroidSpawnInterval) {
      return true;
    }
    return false
  }


  removeAsteroid = (asteroid: Asteroid) => {
    const index = this.asteroids.findIndex(searchAsteroid => searchAsteroid.uuid === asteroid.uuid)
    if(index < 0) {
      return;
    }
    this.asteroids.splice(index, 1)
  }

  getAsteroids = (): Asteroid[] => {
    return this.asteroids;
  }
}