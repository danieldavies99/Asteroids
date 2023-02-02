import { Engine } from "./Engine";


export class Scene {
  /**
   * Scene name, must be unique
   */
  name: string

  /**
   * 
   * Scenes are used to split screens into separate
   * Logic sequences and organize your application's flow
   *
   * @param   {string}  name  scene name, must be unique
   *
   * @return  {void}          void
   */
  constructor(name: string) {
    this.name = name;
  }

  /**
   * Can be overwritten by child classes,
   * Runs once when the scene is loaded
   * and before the gameloop starts
   *
   * @param   {Engine}  engine  Engine instance
   *
   * @return  {void}            void
   */
  public onInit = (_engine: Engine): void => {}

  /**
  * Can be overwritten by child classes,
   * Runs every frame that the scene is 
   * active
   *
   * @param   {number}  frameCount  Number of frames elapsed since game start
   * @param   {number}  delta       Deltatime
   * @param   {Engine}  engine      Engine instance
   *
   * @return  {void}              void
   */
  public onUpdate = (_frameCount: number, _delta: number, _engine: Engine): void => {}
}