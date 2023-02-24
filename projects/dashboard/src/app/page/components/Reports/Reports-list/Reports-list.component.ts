import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-Reports-list',
  templateUrl: './Reports-list.component.html',
  styleUrls: ['./Reports-list.component.css']
})
export class ReportsListComponent implements AfterViewInit {

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
            label: 'satisfaction',
            data: [29374, 33537, 49631, 59095,57828,36684,33572,39974,48847,48116,61004],
            borderColor:'red',
            borderWidth:2
          },
          {
            label: 'loyalty',
            data: [31500,41000, 88800, 46000,32698,5000,3000,18656,24832,36844],
            borderColor:'blue',
            borderWidth:2
          },
          {
            label: 'advocacy',
            data: [3150,4000, 8880, 4600,3269,50000,30000,1865,244832,368454],
            borderColor:'green',
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
