import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})

export class MapaPage implements OnInit {
  contador: string;
  latitud: any;
  longitud: any;
  constructor(private geolocation: Geolocation, 
              public navCtrl: NavController, 
              private route: ActivatedRoute) {
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
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud=  resp.coords.latitude
      this.longitud= resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 
/* 
  let watch = this.geolocation.watchPosition();
  watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
  }); */
}
