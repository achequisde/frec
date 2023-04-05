import { BaseVisualizer } from "./base";
import { STYLE } from "./constants";

class DOMBar {
  public container = document.createElement("div");
  public children: DOMBar[] = [];

  constructor(private classes: string[] = []) {
    this.container.setAttribute("class", classes.join(" "));
  }

  appendChild(child: DOMBar) {
    this.children.push(child);
    this.container.appendChild(child.container);
  }

  hide() {
    this.container.setAttribute("hidden", "true");
  }

  show() {
    this.container.removeAttribute("hidden");
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
    private config = { barCount: 8, stepCount: 64 }
  ) {
    super();

    this.maxAverageValue = 0;
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
      this.container.appendChild(bar.container);
    }

    let containerHeight =
    parseFloat(window.getComputedStyle(this.container, null).height) /
      this.config.stepCount - 1 +
    "px";

    for (let element of this.elements) {
      for (let i = 0; i < this.config.stepCount; i++) {
        let stepBar = new DOMBar(["step-visualizer__step"]);
        element.appendChild(stepBar);
        stepBar.container.style.flexBasis = containerHeight;
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

    for (let [index, element] of this.elements.entries()) {
      // Steps shown will be from 0 to stepAmount
      // We must add 'justify-content: flex-end' in CSS for this to work properly
      let stepAmount = Math.floor(this.averageValues[index] / stepSize);

      if (this.lastIndexMap.has(element)) {
        let lastIndex = this.lastIndexMap.get(element);
        let diff = lastIndex - stepAmount;

        // We need to hide ${diff} elements
        if (diff > 0) {
          let segment = element.children.slice(stepAmount, lastIndex);
          segment.forEach((e) => e.hide());

          // We need to show ${diff} elements
        } else if (diff < 0) {
          let segment = element.children.slice(lastIndex, stepAmount);
          segment.forEach((e) => e.show());
        }
      } else {
        let segment = element.children.slice(stepAmount);
        segment.forEach((e) => e.hide());
      }

      this.lastIndexMap.set(element, stepAmount);
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
