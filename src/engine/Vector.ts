export class Vector {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public distanceTo = (vector: Vector) => {
    const diffX = this.x - vector.x
    const diffY = this.y - vector.y

    return Math.sqrt((diffX*diffX) + (diffY*diffY))
  }

  public bearingTo = (vector: Vector) => {
    let theta = Math.atan2(vector.x - this.x, this.y - vector.y)
    if (theta < 0.0)
      theta += Math.PI*2;
    return theta
  }

  public getRandomPointAtDistance = (distance: number): Vector => {
    const angle = Math.random()*2*Math.PI;
    const xOff = Math.cos(angle)*distance;
    const yOff = Math.sin(angle)*distance;
    const x2 = this.x + xOff;
    const y2 = this.y + yOff;
    return new Vector(x2, y2)
  }
}