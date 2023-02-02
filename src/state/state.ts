export interface GameState {
  highScore: number,
  lastScore: Number,
}

export const defaultState: GameState = {
  highScore: 0,
  lastScore: 0,
}