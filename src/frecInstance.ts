import { BaseAnalyzer } from "./analyzers/base";
import { BaseVisualizer } from "./visualizers";

export default class FrecInstance {
  interval: ms = 50;

  constructor(
    private visualizer: BaseVisualizer,
    private analyzer: BaseAnalyzer
  ) {}

  startTimer() {
    let lastTime: ms = 0;

    const draw = (time: ms) => {
      if (lastTime != null) {
        if (time - lastTime > this.interval) {
          this.analyzer.update();
          this.visualizer.setData(this.analyzer.buffer);
          lastTime = time;
        }
      } else {
        lastTime = time;
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }
}
