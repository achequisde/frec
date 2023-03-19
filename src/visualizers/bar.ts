export class BarVisualizer {
  private parent;
  private container: null | Element = null;
  private segments;
  private data;
  private scales;

  constructor(element: Element, data: number[], config?: BaseVisualizerConfig) {
    this.parent = element;
    this.data = data;
    this.segments = config?.segments || 1;
    this.scales = new Array<number>(config?.segments || 1);

  }

  set updateData(data: number[]) {
    this.data = data;
  }

  createDomElements() {
    this.container = document.createElement("div");
    this.container.setAttribute("class", "bar-visualizer");
    this.parent.appendChild(this.container);

    for (let i = 0; i < this.segments; i++) {
      const child = document.createElement("div");
      child.setAttribute("class", "bar-visualizer__bar");
      this.container.appendChild(child);
    }
  }

  processData() {
    
  }

  updateScales() {}

  update() {}

  static create(parent: Element, data: number[], config: BaseVisualizerConfig) {
    const visualizer = new BarVisualizer(parent, data, config);
    visualizer.createDomElements();
    visualizer.processData();

    return visualizer;
  }
}
