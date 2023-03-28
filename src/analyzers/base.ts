/**
 * Abstract class to shape analyzers.
 * @constructor
 */
export abstract class BaseAnalyzer {
  buffer: Float32Array = new Float32Array();

  protected length() {}
  update() {}
}