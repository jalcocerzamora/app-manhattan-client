import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ScriptService } from '@core/services/helpers/script.service';

import { MasterComponent } from '../pages.module';

import ChartJS from 'chart.js';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends MasterComponent implements OnInit {
  pageTitle = '';
  pageBodyClass = 'dashboard';

  @ViewChild('canvasChart', { static: true }) canvasChart: ElementRef<HTMLCanvasElement>;
  private myChart: ChartJS;

  constructor(
    @Inject(DOCUMENT) document: Document,
    route: ActivatedRoute,
    title: Title,
    private serviceScript: ScriptService,
  ) {
    super(document, route, title);
  }

  ngOnInit(): void {
    this.runNgOnInit();

    this.myChart = new ChartJS(this.canvasChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'dataset - big points',
          data: [
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor()
          ],
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          borderDash: [5, 5],
          pointRadius: 15,
          pointHoverRadius: 10,
        }, {
          label: 'dataset - individual point sizes',
          data: [
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor()
          ],
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          borderDash: [5, 5],
          pointRadius: [2, 4, 6, 18, 0, 12, 20],
        }, {
          label: 'dataset - large pointHoverRadius',
          data: [
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor()
          ],
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
          pointHoverRadius: 30,
        }, {
          label: 'dataset - large pointHitRadius',
          data: [
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor()
          ],
          backgroundColor: 'rgb(255, 205, 86)',
          borderColor: 'rgb(255, 205, 86)',
          fill: false,
          pointHitRadius: 20,
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
        hover: {
          mode: 'index'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart - Different point sizes'
        }
      }
    });
  }

  randomScalingFactor() {
    function rand(min, max) {
      let seed = Date.now();
      min = min === undefined ? 0 : min;
      max = max === undefined ? 1 : max;
      seed = (seed * 9301 + 49297) % 233280;
      return min + (seed / 233280) * (max - min);
    }

    return Math.round(rand(-100, 100));
  }

}
