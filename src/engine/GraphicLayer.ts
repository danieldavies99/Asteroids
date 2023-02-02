import { Element } from "two.js/src/element";
import { Group } from "two.js/src/group";
import { Actor } from "./Actor";

export class GraphicLayer {
  group: Group
  name: string

  constructor(name: string) {
    this.group = new Group()
    this.name = name
  }

  add = (element: Element) => {
    this.group.add(element)
  }

  remove = (element: Element) => {
    this.group.remove(element)
  }
}