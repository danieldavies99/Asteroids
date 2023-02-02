import { Background } from "../actors/Background";
import { PromptText } from "../actors/ui/PromptText";
import { GameTitle } from "../actors/ui/GameTitle";
import { Engine } from "../engine/Engine";
import { Scene } from "../engine/Scene";
import { Vector } from "../engine/Vector";
import Colors from "../utils/Colors";

export class Start extends Scene {

  constructor() {
    super('start')
  }

  public onInit = (engine: Engine) => {
    engine.onPointerDown(() => engine.startScene('level'))

    const bg = new Background(engine.getWidth(), engine.getHeight(), Colors.black)
    engine.add(bg)

    const title = new GameTitle(new Vector(engine.getHalfWidth(), engine.getHalfHeight() - 50))
    engine.add(title)

    const clickToStart = new PromptText(
      new Vector(engine.getHalfWidth(), engine.getHalfHeight()),
      'CLICK TO START'
    )
    engine.add(clickToStart)
  }

  public onUpdate = (_frameCount: number, _delta: number, _engine: Engine) => {
  }
}