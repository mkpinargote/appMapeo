import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetectarRedesPage } from './detectar-redes.page';

const routes: Routes = [
  {
    path: '',
    component: DetectarRedesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetectarRedesPage]
})
export class DetectarRedesPageModule {}
