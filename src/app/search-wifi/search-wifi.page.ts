import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
@Component({
  selector: "app-search-wifi",
  templateUrl: "./search-wifi.page.html",
  styleUrls: ["./search-wifi.page.scss"]
})
export class SearchWifiPage implements OnInit {
  data: any;
  contador: any;
  constructor(public navCtrl: NavController, private hotspot: Hotspot) {}
  ngOnInit() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.data = networks;
      this.contador = networks.length;
    });
  }
  ionViewDidLoad() {}
  goSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
  goToMapa() {
    this.navCtrl.navigateForward(`mapa`);
  }
  doRefresh(event) {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.data = networks;
      this.contador = networks.length;
      event.complete();
    });
  }
  doInfinite(infiniteScroll) {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.data = this.data.concat(networks);
      this.contador = networks.length;
      infiniteScroll.complete();
    });

  }

}
