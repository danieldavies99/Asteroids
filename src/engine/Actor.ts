import { Group } from "two.js/src/group"
import { Shape } from "two.js/src/shape"
import { v4 as uuidv4 } from 'uuid';

export class Actor {
  /**
   * Graphics object, this will be added
   * and removed from the renderer 
   * automatically by engine
   */
  graphics: Shape | Group;

  /**
   * The name of the rendering layer that 
   * this actors graphics belong to, 
   * or undefined if not part of a layer
   */
  renderingLayer: string | undefined

  /**
   * UUID for finding/removing 
   * actors
   */
  uuid: string

  /**
   * A class designed for coupling related logic
   * and rendering functionality.
   * 
   * e.g. player, healthbar, tile, button etc.
   *
   * @return  {void}  void
   */
  constructor() {
    this.uuid = uuidv4()
  }

  /**
   * Can be overwritten by child classes.
   * This method runs every frame the actor is
   * present in Engine
   *
   * @param   {number}  frameCount  Number of frames elapsed since game started
   * @param   {number}  delta       Deltatime
   *
   * @return  {void}                void
   */
  public onUpdate = (frameCount: number, delta: number): void => {}
}
