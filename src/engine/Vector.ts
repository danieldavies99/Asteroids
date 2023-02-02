export class Vector {
  /**
   * x coordinate
   *
   * @var {number}
   */
  public x: number

  /**
   * y coordinate
   *
   * @var {number}
   */
  public y: number

  /**
   * Represents a Cartesian coordinate
   *
   * @param   {number}  x  x coordinate
   * @param   {number}  y  y coordinate
   *
   * @return  {void}     void
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Get the distance to another vector
   *
   * @param   {Vector}  vector  target vector
   *
   * @return  {number}        distance
   */
  public distanceTo = (vector: Vector): number => {
    const diffX = this.x - vector.x
    const diffY = this.y - vector.y

    return Math.sqrt((diffX*diffX) + (diffY*diffY))
  }

  /**
   * Get the bearing to another vector
   *
   * @param   {Vector}  vector  target vector
   *
   * @return  {number}          distance
   */
  public bearingTo = (vector: Vector): number => {
    let theta = Math.atan2(vector.x - this.x, this.y - vector.y)
    if (theta < 0.0)
      theta += Math.PI*2;
    return theta
  }

  /**
   * Returns a random point at a given distance
   *
   * @param   {number}  distance  distance
   *
   * @return  {Vector}            random point at distance
   */
  public getRandomPointAtDistance = (distance: number): Vector => {
    const angle = Math.random()*2*Math.PI;
    const xOff = Math.cos(angle)*distance;
    const yOff = Math.sin(angle)*distance;
    const x2 = this.x + xOff;
    const y2 = this.y + yOff;
    return new Vector(x2, y2)
  }
}