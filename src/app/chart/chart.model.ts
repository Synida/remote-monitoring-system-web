import {SmoothieChart} from "smoothie";

export class Chart {
  public id: string;
  public name: string;
  public unit: string;
  public frequency: string;
  public graph: SmoothieChart;

  constructor (id: string, name: string, unit: string, frequency: string, graph: SmoothieChart) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.frequency = frequency;
    this.graph = graph;

    // this.graph.streamTo(document.getElementById('chart' + this.id));
  }
}
