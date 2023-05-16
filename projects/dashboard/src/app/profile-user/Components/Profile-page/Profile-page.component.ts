import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../../Models/IUser';

@Component({
  selector: 'app-Profile-page',
  templateUrl: './Profile-page.component.html',
  styleUrls: ['./Profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  databar: any;
  datadoughnut: any;
  dataline: any;
  datapolar: any;
  datapie:any;
  dataradar:any;
  datacombo: any;
  chartOptions: any;
  loggedInUser: any; // Declare a variable to store the logged-in user details
  public user :IUser | undefined;
  constructor(private cookieServices:CookieService){}

  ngOnInit() {
     const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }

  console.log(userString);

    // Line Chart
    const lineCanvasEle: any = document.getElementById('line_chart')
    const lineChar = new Chart(lineCanvasEle.getContext('2d'), {
      type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            { data: [12, 15, 18, 14, 11, 19, 12], label: 'Positive ', borderColor: 'green' },
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Negative ', borderColor: 'red' },
          ],
        },
        options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });
    // Bar chart
    const barCanvasEle: any = document.getElementById('bar_chart')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Earnings',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });

  }
}
