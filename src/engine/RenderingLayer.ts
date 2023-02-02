import { Element } from "two.js/src/element";
import { Group } from "two.js/src/group";

export class RenderingLayer {
  /**
   * The TwoJs group used to store all 
   * actors graphics within this layer
   */
  group: Group

  /**
   * Name of rendering layer
   */
  name: string

  /**
   * Rendering layers are used to 
   * define z-indexing of rendered graphics
   *
   * @param   {string}  name  name of rendering layer (must be unique)
   *
   * @return  {void}          void
   */
  constructor(name: string) {
    this.group = new Group()
    this.name = name
  }

  /**
   * Add graphics to layer
   *
   * @param   {Element}  element  twoJs element
   *
   * @return  {void}              void
   */
  add = (element: Element): void => {
    this.group.add(element)
  }

  /**
   * Remove graphics from layer
   *
   * @param   {Element}  element  twoJs element
   *
   * @return  {void}              void
   */
  remove = (element: Element): void => {
    this.group.remove(element)
  }
}