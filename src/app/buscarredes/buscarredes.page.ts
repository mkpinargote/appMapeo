import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-buscarredes',
  templateUrl: './buscarredes.page.html',
  styleUrls: ['./buscarredes.page.scss'],
})
export class BuscarredesPage {
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController, ) { }
  ngOnInit() { }
  async searchRedes() {
    let loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 4000);
    this.navCtrl.navigateForward(`search-wifi`);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
