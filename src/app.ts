import { Frequency } from "./analysers";
import { Bar } from "./visualizers";

const audioElem = document.querySelector("audio") as HTMLAudioElement;
const container = document.querySelector("#container") as HTMLElement;

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audioElem);

const [vis, node] = Frequency.create(audioCtx, source);
node.connect(audioCtx.destination);

if (!container) {
  throw new Error("ID=container is undefined");
}

const barCount = 30;

const BarVisInstance = new Bar(container, vis.buffer, {
  barCount,
});

let lastTime: ms = 0;
const interval: ms = 200;

function draw(time: ms) {
  if (lastTime != null) {
    if (time - lastTime > interval) {
      vis.update();
      BarVisInstance.setData(vis.buffer);
      lastTime = time;
    }
  } else {
    lastTime = time;
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
