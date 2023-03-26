import { STYLE } from "./constants";
import { BaseVisualizer } from "./baseVisualizer";

export class Bar extends BaseVisualizer {
  private parent;
  private container: null | HTMLElement = null;
  private data;
  private barCount;
  private dataBarCountRatio;
  private averageValues;
  private maxAverageValue;

  constructor(
    element: HTMLElement,
    data: Float32Array,
    config?: BarVisualizerConfig
  ) {
    super();
    this.parent = element;
    this.data = data;
    this.barCount = config?.barCount || 1;
    this.averageValues = new Array<number>(config?.barCount || 1);
    this.maxAverageValue = 0;
    this.dataBarCountRatio = Math.floor(this.data.length / this.barCount) || 1;
  }

  setData(data: Float32Array) {
    this.data = data;
    this.update();
  }

  createDomElements() {
    this.container = document.createElement("div");
    this.container.setAttribute("class", STYLE.CONTAINER);
    this.parent.appendChild(this.container);

    for (let i = 0; i < this.barCount; i++) {
      const child = document.createElement("div");
      child.setAttribute("class", STYLE.BAR);
      this.container.appendChild(child);
    }
  }

  processData() {
    for (
      let i = 0, j = 0;
      i < this.barCount && j < this.data.length;
      j += this.dataBarCountRatio, i++
    ) {
      const segment = Array.prototype.slice.call(
        this.data,
        j,
        j + this.dataBarCountRatio
      );
      const averageValue =
        segment.reduce((prev, curr) => prev + curr) / segment.length;
      this.averageValues[i] = averageValue;
      this.maxAverageValue = Math.max(averageValue, this.maxAverageValue);
    }
  }

  updateScales() {
    for (let i = 0; i < this.barCount; i++) {
      const element = this.container?.children[i] as HTMLElement;
      const scale = this.averageValues[i] / this.maxAverageValue;
      element.style.transform = `scaleY(${scale})`;
    }
  }

  update() {
    this.processData();
    this.updateScales();
  }

  static create(
    parent: HTMLElement,
    data: Float32Array,
    config: BarVisualizerConfig
  ) {
    const visualizer = new Bar(parent, data, config);
    visualizer.createDomElements();
    visualizer.update();

    return visualizer;
  }
}
