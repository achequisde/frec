import { BaseVisualizer } from "./base";
import { STYLE } from "./constants";

class DOMBar {
  public container = document.createElement("div");
  public children: DOMBar[] = [];
  private hidden = false;

  constructor(private classes: string[] = []) {
    this.container.setAttribute("class", classes.join(" "));
  }

  appendChild(child: DOMBar) {
    this.children.push(child);
    this.container.appendChild(child.container);
  }

  toggleHide() {
    if (this.hidden) {
      this.container.removeAttribute("hidden");
      this.hidden = false;
    } else {
      this.container.setAttribute("hidden", "true");
      this.hidden = true;
    }
  }
}

export class Step extends BaseVisualizer {
  public container = document.createElement("div");
  public dataBarCountRatio: number;
  public averageValues: any;
  public maxAverageValue: number;

  private elements: DOMBar[] = [];

  constructor(
    public parent: HTMLElement,
    public data: Float32Array,
    private config = { barCount: 8, stepCount: 40 },
  ) {
    super();

    this.maxAverageValue = 0;
    this.dataBarCountRatio = this.data.length / this.config.barCount;

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

    // TODO: Replace with 'display: float'
    let containerHeight =
      parseFloat(window.getComputedStyle(this.container, null).height) /
        this.config.stepCount +
      "px";

    for (let element of this.elements) {
      for (let i = 0; i < this.config.stepCount; i++) {
        let stepBar = new DOMBar(["step-visualizer__step"]);
        element.appendChild(stepBar);
        stepBar.container.style.height = containerHeight;
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

  updateScales(): void {}
}
