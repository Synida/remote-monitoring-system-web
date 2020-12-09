import {Component, OnInit, Output, Input, EventEmitter, Directive} from '@angular/core';
import {ApiService} from '../api.service';
import {HttpClient} from '@angular/common/http';
import {SmoothieChart, TimeSeries} from "smoothie";
import {Chart} from '../chart/chart.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  @Input()
  set ready(isReady: boolean) {
    if (isReady) {
      console.log('hello');
    }
  }
  public charts: Chart[] = [];

  constructor(private httpClient: HttpClient, private dataService: ApiService) { }

  ngOnInit(): void {
    this.httpClient.get<any>(this.dataService.baseUrl + '/measurable/active').subscribe({
      next: data => {
        for (let i = 0; i < data.length; i++) {
          let smoothie = new SmoothieChart({
            grid: {
              strokeStyle:'rgb(125, 0, 0)',
              fillStyle:'rgb(60, 0, 0)',
              lineWidth: 2,
              millisPerLine: 250,
              verticalSections: 20
            },
            labels: {
              fillStyle:'rgb(255, 255, 255)'
            },
          });

          this.charts.push(new Chart(data[i].id, data[i].name, data[i].unit, data[i].frequency, smoothie));
        }

        console.debug(this.charts);
      },
      error: error => {
        console.error('Could not load any measurable', error.message);
      }
    })
  }

  initializeGraph(i) {
    console.log(this.charts);
    // for (let i = 0; i < this.charts.length; i++) {
      this.charts[i].graph.streamTo(
        <HTMLCanvasElement> document.getElementById("chart"+this.charts[i].id), 1000
      );

      let line = new TimeSeries();
      // Add a random value to each line every second
      setInterval(function() {
        line.append(new Date().getTime(), Math.random());
      }, 500);
      this.charts[i].graph.addTimeSeries(line, {
        strokeStyle:'rgb(0, 255, 0)',
        fillStyle:'rgba(0, 255, 0, 0.4)',
        lineWidth:3
      });
    // }
  }
}

@Directive({
  selector: '[refresh]'
})
export class RefreshDirective implements OnInit {
  @Output() init = new EventEmitter();
  ngOnInit() {
    this.init.emit()
  }
}
