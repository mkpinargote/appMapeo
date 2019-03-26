import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {ChartsModule} from 'ng2-charts'
import { EstadisticaPage } from './estadistica.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartsModule,
    ],
  declarations: [EstadisticaPage],
  
})
export class EstadisticaPageModule {}
