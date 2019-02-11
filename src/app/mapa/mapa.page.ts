import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
declare var google;
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps/ngx';
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
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    private hotspot: Hotspot,
  ) {
    this.contador = this.route.snapshot.paramMap.get('cont');
  }
  ngOnInit() {
    this.hotspot.isConnectedToInternet().then((data) => {
      if (data==true){
        this.loadMap();
      }else{
        this.AlertNotConexion()
      }
    });
    
  }
  async AlertNotConexion() {
    const alert1 = await this.alertController.create({
      header: 'Conexión',
      message: 'Se requiere conexión a internet',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.goSearchWifi();
          }
        }
      ]
    });

    await alert1.present();
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
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map_canvas');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 17
    });
    google.maps.event
      .addListenerOnce(this.mapRef, 'idle', () => {
        loading.dismiss();
        this.addMaker(myLatLng.lat, myLatLng.lng);
       
      });
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      animation: google.maps.Animation.DROP,
      title: 'Hello World!'
    });
    google.maps.event.addListener(marker, 'click', () => {
      this.aletMarket();
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  async aletMarket() {
    const alert = await this.alertController.create({
      header: 'red-home',
      subHeader: 'password: 2332',
      buttons: ['OK']
    });

    await alert.present();
  }
}
