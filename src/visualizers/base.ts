/**
 * Abstract class to shape visualizers.
 * @constructor
 * @param {HTMLElement} element - Parent element where DOM elements will be instantiated.
 * @param {Float32Array} data - Data to be displayed.
 * @param {BarVisualizerConfig} data - Additional configuration for the visualizer's display.
 */
export abstract class BaseVisualizer {
  protected setData(data: Float32Array) {}
  protected createDomElements() {}
  protected processData() {}
  protected updateScales() {}
  protected update() {}
}