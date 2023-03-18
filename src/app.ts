import { FrequencyVisualizer } from "./data";

const audioElem = document.querySelector("audio");
const container = document.querySelector("#container");

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audioElem as any);

const [vis, node] = FrequencyVisualizer.create(audioCtx, source, container);
node.connect(audioCtx.destination);
