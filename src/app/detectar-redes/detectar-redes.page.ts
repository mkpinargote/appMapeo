import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detectar-redes',
  templateUrl: './detectar-redes.page.html',
  styleUrls: ['./detectar-redes.page.scss'],
})
export class DetectarRedesPage implements OnInit {

  constructor(public loadingRedes: LoadingController) {}

  async presentLoading() {
    const loading = await this.loadingRedes.create({
      message: 'Buscando redes',
      duration: 2000
    });
    return await loading.present();
  }
  
  ngOnInit() {
  }

}
