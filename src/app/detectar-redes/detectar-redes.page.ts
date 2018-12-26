import { Component, OnInit } from '@angular/core';
import { LoadingController, NumericValueAccessor } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx'

declare var google: any;

@Component({
  selector: 'app-detectar-redes',
  templateUrl: './detectar-redes.page.html',
  styleUrls: ['./detectar-redes.page.scss'],
})
export class DetectarRedesPage implements OnInit {

  mapRef = null;

  constructor(public loadingRedes: LoadingController, 
    private geolocation: Geolocation,
    private loadCtrl: LoadingController) {}

  

  ngOnInit() {
    this.loadMap();
  }
    async presentLoading() {
      const loading = await this.loadingRedes.create({
      message: 'Buscando redes',
      duration: 2000
    });
      return await loading.present();
    }
  

  async loadMap(){
    const loading = await this.loadCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    //console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById('map');
    //crear mapa
      this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMarker(myLatLng.lat, myLatLng.lng);
    });
    
  
  }

  private addMarker(lat: number, lng: number){
    const marker = new google.maps.Marker({
      position: { lat, lng },
      //zoom:8,
      map: this.mapRef,
      title: 'Hola'
    });
  }

  private async getLocation(){
    const rta = await this.geolocation.getCurrentPosition();
    return{
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  
}
