import { Frequency } from "./analyzers";
import FrecInstance from "./frecInstance";
import { Bar } from "./visualizers";

export default abstract class Frec {
  static createBar(container: HTMLElement, audio: HTMLAudioElement): FrecInstance {
    const analyzer = new Frequency(audio);
    const visualizer = new Bar(container, analyzer.buffer, {
      barCount: 30,
    });

    const frec = new FrecInstance(visualizer, analyzer);

    return frec;
  }
}
