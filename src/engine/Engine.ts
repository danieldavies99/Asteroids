import Two from "two.js"
import { Actor } from "./Actor";
import { RenderingLayer } from "./RenderingLayer";
import { Scene } from "./Scene";

export class Engine {

  /**
   * TwoJs instance to be used for all rendering
   *
   * @var {Two}
   */
  private two: Two

  /**
   * Array of all actors currently active
   *
   * @var {Actor[]}
   */
  private actors: Actor[]

  /**
   * Array of all defined rendering layers
   * in the order that they were defined
   *
   * @var {RenderingLayer[]}
   */
  private renderingLayers: RenderingLayer[]

  /**
   * Array of all defined scenes
   *
   * @var {Scene[]}
   */
  private scenes: Scene[]

  /**
   * Dev defined game state
   * can be used to store scores, inventory 
   * etc.
   *
   * @var {any}
   */
  private state: any

  private pointerDown: ((evt: PointerEvent) => void) | undefined
  private pointerUp: ((evt: PointerEvent) => void) | undefined
  private pointerMove: ((evt: PointerEvent) => void) | undefined
  private keyDown: ((evt: KeyboardEvent) => void) | undefined

  /**
   * Stores actor states,
   * game state,
   * rendering layers,
   * twoJs rendering layers,
   * global lifecycle hooks,
   * and scence logic
   *
   * @return  {void}  void
   */
  constructor() {
    this.two = this.initializeTwo()
    this.actors = [];
    this.renderingLayers = [];
    this.scenes = [];
  }

  /**
   * Initializes TwoJs rendering
   *
   * @return  {Two}     twoJs instance
   */
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

  /**
   * Add actor to engine
   *
   * @param   {Actor}   actor      Actor to add
   * @param   {string}  layerName  Optional: rendering layer to add actor to
   *
   * @return  {void}               void
   */
  public add = (actor: Actor, layerName?: string): void => {
    actor.renderingLayer = layerName;
    this.actors.push(actor)
    if(layerName) {
      const layer = this.findRenderingLayer(layerName)
      if(!layer) {
        console.error('Could not find rendering layer with name:', layerName)
        return;
      }
      layer.add(actor.graphics)
      return;
    }
    this.two.add(actor.graphics)
  }

  /**
   * Remove actor from engine
   *
   * @param   {Actor}  actor  actor to remove
   *
   * @return  {void}          void
   */
  public remove = (actor: Actor): void => {
    const index = this.actors.findIndex(search => search.uuid === actor.uuid);
    if(index < 0) {
      console.error('could not remove actor, uuid not found')
      return;
    }

    if(actor.renderingLayer) {
      const renderingLayer = this.findRenderingLayer(actor.renderingLayer)
      renderingLayer?.remove(actor.graphics)
    } else {
      this.two.remove(this.actors[index].graphics)
    }
    this.actors.splice(index, 1)
  }

  /**
   * initialize a new rendering layer
   * the order of initialization 
   * determines z-index of graphics
   * inside layers
   *
   * @param   {string}  name  layer name
   *
   * @return  {void}          void
   */
  public addRenderingLayer = (name: string): void => {
    this.renderingLayers.push(new RenderingLayer(name))
    this.two.add(this.renderingLayers[this.renderingLayers.length - 1].group)
  }

  /**
   * Find and return rendering layer based on 
   * provided name argument
   *
   * @param   {string}        name          rendering layer name
   *
   * @return  {RenderingLayer | undefined}  rendering layer or undefined if not found
   */
  private findRenderingLayer = (name: string): RenderingLayer | undefined => {
    return this.renderingLayers.find(layer => layer.name === name)
  }

  /**
   * start rendering
   *
   * @return  {void}    void
   */
  public start = (): void => {
    this.two.play()
  }

  /**
   * Provide function that will run every 
   * frame. If Engine is using scenes, this method will
   * be overwritten automatically and should not
   * be used.
   *
   * @param   {(
   *   frameCount: number,
   *   delta: number,
   *   engine: Engine
   * ) => void}  update  update function
   *
   * @return  {void}            void
   */
  public onUpdate(update: (frameCount: number, delta: number, engine: Engine) => void): void {
    this.two.unbind('update')
    const _update = (frameCount: number, delta: number) => {
      // run the engine update method first
      update(frameCount, delta, this)
      // then run the each actors update method
      this.actors.forEach(actor => actor.onUpdate(frameCount, delta))
    }
    this.two.bind('update', _update)
  }

 /**
   * returns height of canvas
   *
   * @return  {number}  canvas height
   */
  public getHeight = (): number => {
    return this.two.height
  }

  /**
   * returns half the total height of canvas
   *
   * @return  {number}  half canvas height
   */
  public getHalfHeight = (): number => {
    return this.two.height / 2
  }

   /**
   * returns width of canvas
   *
   * @return  {number}  canvas width
   */
  public getWidth = (): number => {
    return this.two.width
  }

  /**
   * returns half the total width of canvas
   *
   * @return  {number}  half canvas width
   */
  public getHalfWidth = (): number => {
    return this.two.width / 2
  }

  /**
   * Provide function that will run every time 
   * screen is clicked or pressed
   *
   * @param   {(evt: PointerEvent) => void}  pointerDown  method to run when screen is clicked
   *
   * @return  {void}                       void
   */
  public onPointerDown = (pointerDown: (evt: PointerEvent) => void): void => {
    this.pointerDown = pointerDown;
    document.addEventListener('pointerdown', this.pointerDown)
  }

  /**
   * Provide function that will run every time 
   * click or press finishes
   *
   * @param   {(evt: PointerEvent) => void}  pointerUp  method to run when click or press finishes
   *
   * @return  {void}                       void
   */
  public onPointerUp = (pointerUp: (evt: PointerEvent) => void): void => {
    this.pointerUp = pointerUp;
    document.addEventListener('pointerup', this.pointerUp)
  }

  /**
   * Provide function that will run every time 
   * cursor moves
   *
   * @param   {(evt: PointerEvent) => void}  pointerMove  method to run when screen is clicked
   *
   * @return  {void}                       void
   */
  public onPointerMove = (pointerMove: (evt: PointerEvent) => void): void => {
    this.pointerMove = pointerMove;
    document.addEventListener('pointermove', pointerMove)
  }

  /**
   * Provide function that will run every time 
   * a keyboard key is pressed
   *
   * @param   {(evt: KeyboardEvent) => void}  keyDown  method to run when keyboard key is pressed
   *
   * @return  {void}                       void
   */
  public onKeyDown = (keyDown: (evt: KeyboardEvent) => void): void => {
    this.keyDown = keyDown
    document.addEventListener('keydown', this.keyDown)
  }

  /**
   * Provide all scenes that engine 
   * has access to.
   * 
   * Without defining a scence, engine.startScene() 
   * will not be able to find it.
   *
   * @param   {Scene[]}  scenes  Array of scenes to add
   *
   * @return  {void}             void
   */
  public defineScenes = (scenes: Scene[]): void => {
    this.scenes = scenes
  }

  /**
   * remove all listeners that are currently
   * defined. Used before starting a new
   * scene
   *
   * @return  {void}  void
   */
  private removeAllListeners = (): void => {
    if(this.pointerDown)
      document.removeEventListener('pointerdown', this.pointerDown)
    if(this.pointerUp)
      document.removeEventListener('pointerup', this.pointerUp)
    if(this.pointerMove)
      document.removeEventListener('pointermove', this.pointerMove)
    if(this.keyDown)
      document.removeEventListener('keydown', this.keyDown)
  }

  /**
   * remove all actors that are currently
   * defined. Used before starting a new
   * scene
   *
   * @return  {void}  void
   */
  private removeAllActors = (): void => {
    this.actors.forEach(actor => {
      if(actor.renderingLayer) {
        const renderingLayer = this.findRenderingLayer(actor.renderingLayer)
        renderingLayer?.remove(actor.graphics)
      } else {
        this.two.remove(actor.graphics)
      }
    })
    this.actors = [];
  }

  /**
   * remove all rendering layers
   * defined. Used before starting a new
   * scene
   *
   * @return  {void}  void
   */
  private removeAllRenderingLayers = (): void => {
    this.renderingLayers.forEach(renderingLayer => {
      this.two.remove(renderingLayer.group) 
    })
    this.renderingLayers = []
  }

  /**
   * Attempts to find a scene that has
   * been defined and instigate the
   * scenes life-cycle hooks
   *
   * @param   {string}  sceneName  name of scene to start
   *
   * @return  {void}               void
   */
  public startScene = (sceneName: string): void => {
    this.removeAllListeners();
    this.removeAllActors();
    this.removeAllRenderingLayers();

    const scene = this.scenes.find(scene => scene.name === sceneName)
    if(!scene) {
      throw new Error(`no scene found with name: ${sceneName}`)
    }
    scene.onInit(this)
    this.onUpdate(scene.onUpdate)
  }

  /**
   * returns state
   *
   * @return  {any}     state
   */
  getState = (): any => {
    return this.state;
  }

  /**
   * Sets state. e.g. scores, choices, etc.
   *
   * @param   {any}   state  State object
   *
   * @return  {void}         void
   */
  setState = (state: any): void => {
    this.state = state
  }
}