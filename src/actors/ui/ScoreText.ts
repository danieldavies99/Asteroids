import { Text } from "two.js/src/text";
import { Actor } from "../../engine/Actor";
import { Vector } from "../../engine/Vector";

export class ScoreText extends Actor{
  pos: Vector

  score: number
  scoreTextSprite: Text

  constructor (startPos: Vector) {
    super()
    this.score = 0

    this.scoreTextSprite = new Text('000000', 0, 0)
    this.scoreTextSprite.size = 18
    this.scoreTextSprite.weight = 700

    this.graphics = this.scoreTextSprite
    this.setPos(startPos)
  }

  setPos = (pos: Vector) => {
    this.pos = pos;
    this.graphics.position.x = this.pos.x
    this.graphics.position.y = this.pos.y
  }

  setScore = (score: number) => {
    this.score = score;
    this.scoreTextSprite.value = String(score).padStart(6, '0')
  }
}