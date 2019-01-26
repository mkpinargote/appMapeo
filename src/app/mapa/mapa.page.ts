import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
declare var google;
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})

export class MapaPage implements OnInit {
  mapRef = null;
  contador: string;
  latitud: any;
  longitud: any;
  map: GoogleMap;
  constructor(private geolocation: Geolocation,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {
    this.contador = this.route.snapshot.paramMap.get('cont');
  }
  ngOnInit() {
    this.loadMap();
  }
  goSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
  goToMapa() {
    this.navCtrl.navigateForward(`mapa`);
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
      'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
    });
    const myLatLng = await this.getLocation();
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: myLatLng.lat,
          lng: myLatLng.lng
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    loading.dismiss();
    this.addMaker(myLatLng.lat, myLatLng.lng);
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
  private addMaker(lat: number, lng: number) {
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: lat,
        lng: lng
      }
    });
    marker.showInfoWindow();
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}
