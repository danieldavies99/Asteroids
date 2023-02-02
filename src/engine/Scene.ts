import { Engine } from "./Engine";


export class Scene {
  name: string

  constructor(name: string) {
    this.name = name;
  }

  public onInit = (engine: Engine) => {}
  public onUpdate = (frameCount: number, delta: number, engine: Engine) => {}
}