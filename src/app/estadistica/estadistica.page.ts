//import { Component } from '@angular/core';
import { Component } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser-animations';
// import {NgxChartsModule} from '@swimlane/ngx-charts';
// import {single, multi} from '../../app/data/data';
//import {NavController} from '@ionic/angular';
//import {ChartsModule} from 'ng2-charts';
//import { Chart } from 'chart.js';
//import { Ng2GoogleChartsModule } from 'ng2-google-charts'; , OnInit, ViewChild, ElementRef, AfterViewInit


//declare var google;

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})

 

export class EstadisticaPage  {
//1
  // @ViewChild('chartContainer') chartcontainer: ElementRef;
  // @ViewChild('chartcanvas') chartcanvas: ElementRef;

  // myChart: Chart;1
  //pieChartData;

  //constructor(public navCtrl: NavController) {}
  // public doughnutChartLabels:string[]= ['Me','Myself','Irine'];
  // public doughnutChartData:number[]=[1200,1500,2000];
  // public doughnutChartType:string='doughnut';


  options = {
    color: ['#3398DB'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Test',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
}
 



 //3 ngOnInit() {
  //   this.useAngularLibrary();
  // }


  // useAngularLibrary() {
  //   this.pieChartData = {
  //     chartType: 'PieChart',
  //     dataTable: [
  //       ['Languages', 'Percent'],
  //       ['Ionic',     33],
  //       ['Angular',      33],
  //       ['JavaScript',  33]
  //     ],
  //     options: {
  //     'title': 'Technologies',
  //     'width': 400,
  //     'height': 300
  //     }
  //   };
  // }





//1
  // ngAfterViewInit() {

  //   this.createChart();

  // }


  // createChart() {   
  //   this.myChart = new Chart(this.chartcanvas.nativeElement, {
  //     type: 'horizontalBar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255,99,132,1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }1

  // showChart(){
  //   debugger
  //   var data = new google.visualization.DataTable();
  //       data.addColumn('string', 'Topping');
  //       data.addColumn('number', 'Slices');
  //       data.addRows([
  //         ['Mushrooms', 3],
  //         ['Onions', 1],
  //         ['Olives', 1],
  //         ['Zucchini', 1],
  //         ['Pepperoni', 2]
  //       ]);

  //       // Set chart options
  //       var options = {'title':'How Much Pizza I Ate Last Night',
  //                      'width':400,
  //                      'height':300};

  //       // Instantiate and draw our chart, passing in some options.
  //       var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  //       chart.draw(data, options);
  //     }
