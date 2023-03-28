import { Frequency } from "./analyzers";
import Frec from "./frec";
import { Bar } from "./visualizers";

const audioElem = document.querySelector("audio") as HTMLAudioElement;
const container = document.querySelector("#container") as HTMLElement;

const analyzer = new Frequency(audioElem);
const visualizer = new Bar(container, analyzer.buffer, {
  barCount: 30,
});

const frec = new Frec(
  visualizer,
  analyzer,
)

frec.startTimer();