export class Frequency {
  public buffer;
  analyzer;

  constructor(audioElement: HTMLAudioElement) {
    const context = new AudioContext();
    const source = context.createMediaElementSource(audioElement);

    this.analyzer = context.createAnalyser();
    this.analyzer.fftSize = 256;
    this.buffer = new Float32Array(this.length());

    source.connect(this.analyzer)
    source.connect(context.destination)
  }

  set fftSize(size: number) {
    this.analyzer.fftSize = size;
    this.buffer = new Float32Array(this.length());
  }

  length() {
    return this.analyzer.frequencyBinCount;
  }

  update() {
    this.analyzer.getFloatFrequencyData(this.buffer);

    this.buffer = this.buffer.map((e) => {
      let scaleFactor =
        this.analyzer.maxDecibels === this.analyzer.minDecibels
          ? 1
          : 1 / (this.analyzer.maxDecibels - this.analyzer.minDecibels);
      let clamped = (e - this.analyzer.minDecibels) * scaleFactor;
      return clamped < 0 ? 0 : clamped;
    });
  }
}
