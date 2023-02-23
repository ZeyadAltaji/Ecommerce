import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements AfterViewInit {
  @ViewChild('doubleLineCanvas') doubleLineCanvas: ElementRef | undefined;
  doubleLineChart: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.doubleLineChartMethod();
  }

  doubleLineChartMethod(): void {
    this.doubleLineChart = new Chart(this.doubleLineCanvas?.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov'],
        datasets: [
          {
            label: 'BTC',
            data: [29374, 33537, 49631, 59095,57828,36684,33572,39974,48847,48116,61004],
            borderColor:'red',
            borderWidth:2
          },
          {
            label: 'ETH',
            data: [31500,41000, 88800, 46000,32698,5000,3000,18656,24832,36844],
            borderColor:'blue',
            borderWidth:2
          },
        ],
      },

      options: {
        responsive: true,
      },
    });
  }
}



