import { Group } from "two.js/src/group";

import { Actor } from "../../engine/Actor";
import { Vector } from "../../engine/Vector";
import { ScoreText } from "./ScoreText";
import { TopRightBox } from "./TopRightBox";


export class Score extends Actor {
  pos: Vector

  scoreText: ScoreText

  box: TopRightBox

  score: number

  private spriteGroup: Group

  constructor(
    startPos: Vector,
  ) {
    super()

    this.box = new TopRightBox(new Vector(0, 0));
    this.scoreText = new ScoreText(new Vector(37, 16))    

    this.spriteGroup = new Group([
      this.box.graphics,
      this.scoreText.graphics
    ])

    this.graphics = this.spriteGroup
    this.score = 0
    this.setPos(startPos)
  }

  setScore = (score: number) => {
    this.score = score
    this.scoreText.setScore(score)
  }

  setPos = (pos: Vector) => {
    this.pos = pos;
    this.graphics.position.x = this.pos.x
    this.graphics.position.y = this.pos.y
  }

  onUpdate = (frameCount: number, delta: number) => {};
}