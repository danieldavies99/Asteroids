export class Timer {
  /**
   * time in milliseconds that timer started
   *
   * @var {number}
   */
  private startedAt: number

  /**
   * time elapsed since time started
   *
   * @var {number}
   */
  private elapsed: number

  /**
   * 
   * used in onUpdate function to keep track of time
   *
   * @param   {number}  time  start time
   *
   * @return  {void}          void
   */
  constructor(time: number) {
    this.startedAt = time
    this.elapsed = 0
  }

  /**
   * calculate elapsed time based on current time
   *
   * @param   {number}  time  current time
   *
   * @return  {void}          void
   */
  update = (time: number): void => {
    this.elapsed = time - this.startedAt
  }

  /**
   * Get time started at
   *
   * @return  {number}  started at
   */
  getStartedAt = (): number => {
    return this.startedAt
  }

  /**
   * get time elapsed since started
   *
   * @return  {number}  elapsed
   */
  getElapsed = (): number => {
    return this.elapsed
  }
}