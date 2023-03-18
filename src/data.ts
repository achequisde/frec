export class FrequencyVisualizer {
  private buffer;
  private paused = false;

  constructor(private analyser: AnalyserNode, private parent: Element | null) {
    this.analyser.fftSize = 256;
    this.buffer = new Float32Array(this.length());
  }

  set fftSize(size: number) {
    this.analyser.fftSize = size;
    this.buffer = new Float32Array(this.length());
  }

  length() {
    return this.analyser.frequencyBinCount;
  }

  play() {
    const draw = () => {
        this.analyser.getFloatFrequencyData(this.buffer);
        console.log(this.buffer)
        if (!this.paused) requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
  }

  pause() {
    this.paused = true;
  }

  static create(
    context: AudioContext,
    node: MediaElementAudioSourceNode,
    parent: Element | null
  ): [FrequencyVisualizer, AnalyserNode] {
    const analyser = context.createAnalyser();
    node.connect(analyser);
    return [new FrequencyVisualizer(analyser, parent), analyser];
  }
}
