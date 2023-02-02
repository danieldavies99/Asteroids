import { Engine } from "./engine/Engine";
import { Level } from "./scenes/Level";
import { Start } from "./scenes/Start";

const engine = new Engine()

engine.defineScenes([
  new Start(),
  new Level()
])
engine.startScene('start')
engine.start();