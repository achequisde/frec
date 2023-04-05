import Frec from "./frec";
import { Step } from "./visualizers";

const audioElem = document.querySelector("audio") as HTMLAudioElement;
const container = document.querySelector("#container") as HTMLElement;

// const frec = Frec.createBar(container, audioElem);
// frec.startTimer();

let step = new Step(container);
