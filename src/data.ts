export class FrequencyVisualizer {
  public buffer;

  constructor(private analyser: AnalyserNode) {
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

  update() {
    this.analyser.getFloatFrequencyData(this.buffer);

    this.buffer = this.buffer.map((e) => {
      let scaleFactor =
        this.analyser.maxDecibels === this.analyser.minDecibels
          ? 1
          : 1 / (this.analyser.maxDecibels - this.analyser.minDecibels);
      let clamped = (e - this.analyser.minDecibels) * scaleFactor;
      return clamped < 0 ? 0 : clamped;
    });
  }

  static create(
    context: AudioContext,
    node: MediaElementAudioSourceNode
  ): [FrequencyVisualizer, AnalyserNode] {
    const analyser = context.createAnalyser();
    node.connect(analyser);
    return [new FrequencyVisualizer(analyser), analyser];
  }
}
