import { BaseVisualizer } from "./base";
import { STYLE } from "./constants";

class DOMBar {
  public dom = document.createElement("div");
  public children: DOMBar[] = [];
  public color = "";

  constructor(private classes: string[] = []) {
    this.dom.setAttribute("class", classes.join(" "));
  }

  appendChild(child: DOMBar) {
    this.children.push(child);
    this.dom.appendChild(child.dom);
  }

  hide() {
    this.dom.style.backgroundColor = "transparent";
  }

  show() {
    this.dom.style.backgroundColor = this.color;
  }
}

export class Step extends BaseVisualizer {
  public container = document.createElement("div");
  public dataBarCountRatio: number;
  public averageValues: any;
  public maxAverageValue: number;

  private elements: DOMBar[] = [];
  private lastIndexMap = new WeakMap();

  constructor(
    public parent: HTMLElement,
    public data: Float32Array,
    private config = { barCount: 8, stepCount: 100 },
    private colors = ["lime", "yellow", "red"]
  ) {
    super();

    this.maxAverageValue = 1;
    this.dataBarCountRatio = this.data.length / this.config.barCount;
    this.averageValues = new Array<number>(this.config.barCount);
    this.container.setAttribute("class", STYLE.CONTAINER);
    this.parent.appendChild(this.container);
    this.createDomElements();
  }

  createDomElements(): void {
    for (let i = 0; i <= this.config.barCount; i++) {
      const bar = new DOMBar(["step-visualizer__bar"]);
      this.elements.push(bar);
      this.container.appendChild(bar.dom);
    }

    let containerHeight =
      parseFloat(window.getComputedStyle(this.container, null).height) /
        this.config.stepCount -
      1 +
      "px";

    // Steps are appended top-to-bottom (normal box model behavior)
    // But we want to assign colors bottom-to-top
    let stepColors = this.colors.slice().reverse();
    let colorSegments =
      Math.floor(this.config.stepCount / stepColors.length) + 1;

    // Create steps
    for (let element of this.elements) {
      for (let i = 0; i < this.config.stepCount; i++) {
        let stepBar = new DOMBar(["step-visualizer__step"]);
        stepBar.dom.style.flexBasis = containerHeight;
        let stepColor = stepColors[Math.floor(i / colorSegments)];
        stepBar.dom.style.backgroundColor = stepColor;
        stepBar.color = stepColor;
        stepBar.hide();
        element.appendChild(stepBar);
      }
    }
  }

  processData(): void {
    for (
      let i = 0, j = 0;
      i < this.config.barCount && j < this.data.length;
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

  updateScales(): void {
    let stepSize = this.maxAverageValue / this.config.stepCount;

    for (let [index, bar] of this.elements.entries()) {
      let stepsToShow = Math.floor(this.averageValues[index] / stepSize) || 0;
      let from;
      let to;

      if (this.lastIndexMap.has(bar)) {
        from = this.lastIndexMap.get(bar);
        to = bar.children.length - stepsToShow;

        let delta = from - to;
        this.lastIndexMap.set(bar, to);

        if (delta < 0) {
          // We must hide elements
          bar.children.slice(from, to).forEach((step) => step.hide());
        } else if (delta > 0) {
          // We must show elements
          [from, to] = [to, from];
          bar.children.slice(from, to).forEach((step) => step.show());
        }
      } else {
        from = bar.children.length - stepsToShow;
        bar.children.slice(from).forEach((step) => step.show());
        this.lastIndexMap.set(bar, from);
      }
    }
  }

  setData(data: Float32Array) {
    this.data = data;
    this.update();
  }

  update() {
    this.processData();
    this.updateScales();
  }
}
