import { Rectangle } from "two.js/src/shapes/rectangle";
import { Actor } from "../engine/Actor";

export class Background extends Actor {
  constructor(width: number, height: number, color: string) {
    super()
    const bg = new Rectangle(width / 2, height / 2, width, height)
    bg.noStroke();
    bg.fill = color,
    this.graphics = bg;
  }
}