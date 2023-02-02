import { Engine } from "./engine/Engine";
import { GameOver } from "./scenes/GameOver";
import { Level } from "./scenes/Level";
import { Start } from "./scenes/Start";

const engine = new Engine()

engine.defineScenes([
  new Start(),
  new Level(),
  new GameOver(),
])
engine.startScene('start')
engine.start();