import { Background } from "../actors/Background";
import { ClickToStart } from "../actors/ui/ClickToStart";
import { GameTitle } from "../actors/ui/GameTitle";
import { Engine } from "../engine/Engine";
import { Scene } from "../engine/Scene";
import { Vector } from "../engine/Vector";
import Colors from "../utils/Colors";

export class Start extends Scene {
  name: string

  constructor() {
    super('start')
  }

  public onInit = (engine: Engine) => {
    engine.onPointerDown(() => engine.startScene('level'))

    const bg = new Background(engine.getWidth(), engine.getHeight(), Colors.black)
    engine.add(bg)

    const title = new GameTitle(new Vector(engine.getHalfWidth(), engine.getHalfHeight() - 50))
    engine.add(title)

    const clickToStart = new ClickToStart(new Vector(engine.getHalfWidth(), engine.getHalfHeight()))
    engine.add(clickToStart)
  }

  public onUpdate = (frameCount: number, delta: number, engine: Engine) => {
  }
}