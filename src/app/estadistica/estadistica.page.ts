
import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})

export class EstadisticaPage  {
  constructor(public navCtrl: NavController) {}
  public doughnutChartLabels:string[]= ['Me','Myself','Irine'];
  public doughnutChartData:number[]=[1200,1500,2000];
  public doughnutChartType:string='doughnut';
}