import { Frequency } from "./analyzers";
import { Bar } from "./visualizers";

const audioElem = document.querySelector("audio") as HTMLAudioElement;
const container = document.querySelector("#container") as HTMLElement;

const analyzer = new Frequency(audioElem);
const BarVisInstance = new Bar(container, analyzer.buffer, {
  barCount: 30,
});

let lastTime: ms = 0;
const interval: ms = 200;

function draw(time: ms) {
  if (lastTime != null) {
    if (time - lastTime > interval) {
      analyzer.update();
      BarVisInstance.setData(analyzer.buffer);
      lastTime = time;
    }
  } else {
    lastTime = time;
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
