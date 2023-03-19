import { FrequencyVisualizer } from "./data";
import { BarVisualizer } from "./visualizers";

const audioElem = document.querySelector("audio");
const container = document.querySelector("#container");

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audioElem as any);

const [vis, node] = FrequencyVisualizer.create(audioCtx, source, container);
node.connect(audioCtx.destination);

if (!container) {
  throw new Error("ID=container is undefined")
}

const dummyData = [23, 232, 54, 54, 12, 34, 54];
const BarVisInstance = BarVisualizer.create(container, dummyData, { segments: 8 });