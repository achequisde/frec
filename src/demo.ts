import { Frequency } from "./analyzers";
import Frec from "./frec";
import { Step } from "./visualizers";

const audioElem = document.querySelector("audio") as HTMLAudioElement;
const container = document.querySelector("#container") as HTMLElement;

// const frec = Frec.createBar(container, audioElem);
// frec.startTimer();

let vis = new Frequency(audioElem);
let step = new Step(container, vis.buffer);

function startTimer() {
    let lastTime: ms = 0;

    const draw = (time: ms) => {
      if (lastTime != null) {
        if (time - lastTime > 50) {
          vis.update();
          step.setData(vis.buffer);
          lastTime = time;
        }
      } else {
        lastTime = time;
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
}

startTimer();