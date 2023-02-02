import { Arrow } from "../actors/Arrow";
import { Asteroid } from "../actors/Asteroid";
import { Vector } from "../engine/Vector";

export class AsteroidTracker {
  private asteroids: Asteroid[]

  constructor () {
    this.asteroids = [];
  }
  newAsteroid = (
    pos: Vector,
    target: Arrow
  ): Asteroid => {
    const asteroid = new Asteroid(
        pos,
        target,
        0.1
    )
    this.asteroids.push(asteroid)
    return asteroid;
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