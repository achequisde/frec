import { BaseVisualizer } from "./visualizers";

export default class Frec {
  visualizer;

  constructor(
    visualizer: BaseVisualizer,
  ) {
    this.visualizer = visualizer;
  }
}