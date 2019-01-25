import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  contador: string;
  constructor(public navCtrl: NavController, private route: ActivatedRoute) {
    this.contador = this.route.snapshot.paramMap.get('cont');
   }

  ngOnInit() {
  }
  goSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
  goToMapa() {
    this.navCtrl.navigateForward(`mapa`);
  }
}
