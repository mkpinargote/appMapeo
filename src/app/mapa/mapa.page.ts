import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { RedesService } from '../../app/api/red/redes.service';
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
  redes: any;
  accuracy: any;

  constructor(private geolocation: Geolocation,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    private hotspot: Hotspot,
    public redesServices: RedesService,
  ) {
    this.contador = this.route.snapshot.paramMap.get('cont');
  }
  ngOnInit() {
    // this.hotspot.isConnectedToInternet().then((data) => {
    //  if (data == true) {
    this.loadMap();
    //   } else {
    //    this.AlertNotConexion()
    //  }
    //  });

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
    // const myLatLng = await this.getLocation();
    const myLatLng = new google.maps.LatLng(40.723333, -73.983438);
    const mapEle: HTMLElement = document.getElementById('map_canvas');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 16,
      mapTypeControl: true,
      mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var cityCircle = new google.maps.Circle({
      strokeColor: '#348772',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#348772',
      fillOpacity: 0.35,
      map: this.mapRef,
      center: myLatLng,
      radius: 300
    });
    google.maps.event
      .addListenerOnce(this.mapRef, 'idle', () => {
        loading.dismiss();
        const marker = new google.maps.Marker({
          position: myLatLng,
          map: this.mapRef,
          animation: google.maps.Animation.DROP,
          title: 'Ubicación actual',
          icon: 'https://icon-icons.com/icons2/165/PNG/32/mapmarker_marker_outside_chartreuse_23006.png'
        });
        this.addMaker(myLatLng);
        //cityCircle.setRaduius();
      });
  }
  private addMaker(posicionAcual: any) {

    // function rad(x) {
    //   return x * Math.PI / 180;
    // };

    // function getDistance(p1, p2) {
    //   //	http://es.wikipedia.org/wiki/F{1f0778fe2e852b61c79949ce7b4bb677680b76fea251b03768a071033ace27eb}C3{1f0778fe2e852b61c79949ce7b4bb677680b76fea251b03768a071033ace27eb}B3rmula_del_Haversine
    //   var R = 6378137; //radio de la tierra en metros
    //   var dLat = rad(p2.lat() - p1.lat());
    //   var dLong = rad(p2.lng() - p1.lng());
    //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //   var d = R * c;
    //   return d;
    // };
    this.redesServices.getRedes()
      .then(data => {
        var location = [];
        location = data['redes'];
        var i;
        for (i = 0; i < location.length; i++) {
          var marker_lat_lng = new google.maps.LatLng(location[i].latitud, location[i].longitud);
          var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(posicionAcual, marker_lat_lng); //distance in meters between your location and the marker
          // console.log('obteniendo distancia con formula Haversine:' + getDistance(posicionAcual, marker_lat_lng));
          // console.log('obteniendo con Google :' +
          //   google.maps.geometry.spherical.computeDistanceBetween(posicionAcual, marker_lat_lng));
          if (distance_from_location <= 300) {
            var infowindow = new google.maps.InfoWindow();
            const marker = new google.maps.Marker({
              position: marker_lat_lng,
              map: this.mapRef,
              animation: google.maps.Animation.DROP,
              title: 'Wifi',
              icon: 'http://icons.iconarchive.com/icons/papirus-team/papirus-apps/32/fern-wifi-cracker-icon.png'
            });
            var geocoder = new google.maps.Geocoder();
            // le asignamos una funcion al eventos dragend del marcado
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
              return function () {
                geocoder.geocode({ 'latLng': marker_lat_lng }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    var address = results[0]['formatted_address'];
                    console.log(address);
                  }
                });
                infowindow.setContent('<strong>Red:</strong> ' + location[i].nombreRed + '</br><strong>Contraseña: </strong> ' + location[i].passwordRed);
                infowindow.open(this.mapRef, marker);
              }
            })(marker, i));
          } else {
            console.log('=> is NOT in searchArea');
          }
        }
      });
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    this.accuracy = rta.coords.accuracy
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
}
