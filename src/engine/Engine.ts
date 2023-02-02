import Two from "two.js"
import { Actor } from "./Actor";
import { GraphicLayer } from "./GraphicLayer";
import { Scene } from "./Scene";

export class Engine {
  private two: Two
  private actors: Actor[]

  private graphicLayers: GraphicLayer[]

  private scenes: Scene[]

  private pointerDown: (evt: PointerEvent) => void
  private pointerUp: (evt: PointerEvent) => void
  private pointerMove: (evt: PointerEvent) => void
  private keyDown: (evt: KeyboardEvent) => void

  constructor() {
    this.two = this.initializeTwo()
    this.actors = [];
    this.graphicLayers = [];
  }

  private initializeTwo = (): Two => {
    const element = document.getElementById('app');
    const twoParams = {
      fullscreen: true
    };
    if(!element) {
      throw new Error('No #app element found');
    }
    const two = new Two(twoParams).appendTo(element)
    return two
  }

  public add = (actor: Actor, layerName?: string): void => {
    actor.graphicLayer = layerName;
    this.actors.push(actor)
    if(layerName) {
      const layer = this.findGraphicLayer(layerName)
      if(!layer) {
        console.error('Could not find layer with name:', layerName)
        return;
      }
      layer.add(actor.graphics)
      return;
    }
    this.two.add(actor.graphics)
  }

  public remove = (actor: Actor): void => {
    const index = this.actors.findIndex(search => search.uuid === actor.uuid);
    if(index < 0) {
      console.error('could not remove actor, uuid not found')
      return;
    }

    if(actor.graphicLayer) {
      const graphicLayer = this.findGraphicLayer(actor.graphicLayer)
      graphicLayer?.remove(actor.graphics)
    } else {
      this.two.remove(this.actors[index].graphics)
    }
    this.actors.splice(index, 1)
  }

  public addGraphicLayer = (name: string) => {
    this.graphicLayers.push(new GraphicLayer(name))
    this.two.add(this.graphicLayers[this.graphicLayers.length - 1].group)
  }

  public removeGraphicLayer = (name: string): void => {
    const index = this.graphicLayers.findIndex(layer => layer.name === name);
    if(index < 0) {
      console.error('could not layer actor, name not found')
      return;
    }

    this.two.remove(this.graphicLayers[index].group)
    this.graphicLayers.splice(index, 1)
  }

  private findGraphicLayer = (name: string): GraphicLayer | undefined => {
    return this.graphicLayers.find(layer => layer.name === name)
  }

  public start = () => {
    this.two.play()
  }

  public onUpdate(update: (frameCount: number, delta: number, engine: Engine) => void) {
    this.two.unbind('update')
    const _update = (frameCount: number, delta: number) => {
      // run the engine update method first
      update(frameCount, delta, this)
      // then run the each actors update method
      this.actors.forEach(actor => actor.onUpdate(frameCount, delta))
    }
    this.two.bind('update', _update)
  }

  public getHeight = (): number => {
    return this.two.height
  }

  public getHalfHeight = (): number => {
    return this.two.height / 2
  }

  public getWidth = (): number => {
    return this.two.width
  }

  public getHalfWidth = (): number => {
    return this.two.width / 2
  }

  public onPointerDown = (pointerDown: (evt: PointerEvent) => void): void => {
    this.pointerDown = pointerDown;
    document.addEventListener('pointerdown', this.pointerDown)
  }

  public onPointerUp = (pointerUp: (evt: PointerEvent) => void): void => {
    this.pointerUp = pointerUp;
    document.addEventListener('pointerup', this.pointerUp)
  }

  public onPointerMove = (pointerMove: (evt: PointerEvent) => void): void => {
    this.pointerMove = pointerMove;
    document.addEventListener('pointermove', pointerMove)
  }

  public onKeyDown = (keyDown: (evt: KeyboardEvent) => void): void => {
    this.keyDown = keyDown
    document.addEventListener('keydown', this.keyDown)
  }

  public defineScenes = (scenes: Scene[]) => {
    this.scenes = scenes
  }

  private removeAllListeners = () => {
    document.removeEventListener('pointerdown', this.pointerDown)
    document.removeEventListener('pointerup', this.pointerUp)
    document.removeEventListener('pointermove', this.pointerMove)
    document.removeEventListener('keydown', this.keyDown)
  }

  private removeAllActors = () => {
    this.actors.forEach(actor => this.remove(actor))
  }

  private removeAllGraphicLayers = () => {
    this.graphicLayers.forEach(graphicLayer => this.removeGraphicLayer(graphicLayer.name))
  }

  public startScene = (sceneName: string) => {
    this.removeAllListeners();
    this.removeAllActors();
    this.removeAllGraphicLayers();

    const scene = this.scenes.find(scene => scene.name === sceneName)
    if(!scene) {
      throw new Error(`no scene found with name: ${sceneName}`)
    }
    scene.onInit(this)
    this.onUpdate(scene.onUpdate)
  }
}