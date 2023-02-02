import { Group } from "two.js/src/group"
import { Shape } from "two.js/src/shape"
import { v4 as uuidv4 } from 'uuid';

export class Actor {
  graphics: Shape | Group;
  graphicLayer: string | undefined
  uuid: string

  constructor() {
    this.uuid = uuidv4()
  }

  public onUpdate = (frameCount: number, delta: number) => {}
}
