import { Engine } from "./engine/Engine";
import { GameOver } from "./scenes/GameOver";
import { Level } from "./scenes/Level";
import { Start } from "./scenes/Start";
import { defaultState } from "./state/state";

const engine = new Engine()

engine.defineScenes([
  new Start(),
  new Level(),
  new GameOver(),
])

engine.setState(defaultState)
engine.startScene('start')
engine.start();