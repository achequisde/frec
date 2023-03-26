import { FrequencyVisualizer } from "./data";
import { Bar } from "./visualizers";

const audioElem = document.querySelector("audio");
const container = document.querySelector("#container") as HTMLElement;

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audioElem as any);

const [vis, node] = FrequencyVisualizer.create(audioCtx, source, container);
node.connect(audioCtx.destination);

if (!container) {
  throw new Error("ID=container is undefined");
}

let barCount = 30;

// const getRandomArray = () =>
//   [...Array(barCount)].map(() => Math.random() * 100);
// const dummyData = getRandomArray();

const BarVisInstance = Bar.create(container, vis.buffer, {
  barCount,
});

let lastTime;

function draw(time) {
  if (lastTime != null) {
    if (time - lastTime > 200) {
      vis.update();
      BarVisInstance.updateData = vis.buffer;
      lastTime = time;
    }
  } else {
    lastTime = time;
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
