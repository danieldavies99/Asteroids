import { Background } from "../actors/Background";
import { PromptText } from "../actors/ui/PromptText";
import { GameTitle } from "../actors/ui/GameTitle";
import { Engine } from "../engine/Engine";
import { Scene } from "../engine/Scene";
import { Vector } from "../engine/Vector";
import Colors from "../utils/Colors";

export class GameOver extends Scene {
  name: string

  constructor() {
    super('gameOver')
  }

  public onInit = (engine: Engine) => {
    engine.onPointerDown(() => engine.startScene('level'))

    const bg = new Background(engine.getWidth(), engine.getHeight(), Colors.black)
    engine.add(bg)

    const title = new GameTitle(new Vector(engine.getHalfWidth(), engine.getHalfHeight() - 50))
    engine.add(title)

    const score = new PromptText(
      new Vector(engine.getHalfWidth(), engine.getHalfHeight()),
      'SCORE: ' + engine.getState().lastScore
    )
    engine.add(score)

    const highScore = new PromptText(
      new Vector(engine.getHalfWidth(), engine.getHalfHeight() + 30),
      'HIGH SCORE: ' + engine.getState().highScore
    )
    engine.add(highScore)

    const clickToRestart = new PromptText(
      new Vector(engine.getHalfWidth(), engine.getHalfHeight() + 80),
      'CLICK TO PLAY AGAIN'
    )
    engine.add(clickToRestart)
  }

  public onUpdate = (frameCount: number, delta: number, engine: Engine) => {
  }
}