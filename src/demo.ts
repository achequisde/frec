import Frec from "./frec";

const audioElem = document.querySelector("audio") as HTMLAudioElement;
const container = document.querySelector("#container") as HTMLElement;

const frec = Frec.createBar(container, audioElem);
frec.startTimer();