import { FrequencyVisualizer } from "./data";
import { BarVisualizer } from "./visualizers";

const audioElem = document.querySelector("audio");
const container = document.querySelector("#container") as HTMLElement;

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audioElem as any);

const [vis, node] = FrequencyVisualizer.create(audioCtx, source, container);
node.connect(audioCtx.destination);

if (!container) {
  throw new Error("ID=container is undefined");
}

const getRandomArray = () => [...Array(20)].map(() => Math.random() * 100);
const dummyData = getRandomArray();

const BarVisInstance = BarVisualizer.create(container, dummyData, {
  barCount: 20,
});

setInterval(() => {
  BarVisInstance.updateData = getRandomArray();
}, 200);
