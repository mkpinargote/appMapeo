import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RedesService } from '../../app/api/red/redes.service';
//import jQuery from 'jquery';
@Component({
  selector: "app-search-wifi",
  templateUrl: "./search-wifi.page.html",
  styleUrls: ["./search-wifi.page.scss"]
})
export class SearchWifiPage implements OnInit {
  data: any;
  cont: any;
  dataSSID:any ;
  dataIPAddress: any;
  datalinkSpeed: any;
  dataSecurity:any;
  redes: any;
  red: any = {};
  latituds:any;
  longituds:any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    private hotspot: Hotspot,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private network: Network,
    public menuCtrl: MenuController,
    public redesServices: RedesService,
    private geolocation: Geolocation) {}
  ngOnInit() {
    this.getConeccionActual();
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.restarVacio(networks);
    });
  }

  // async addRed(){
  //   const alert = await this.alertController.create({
  //     header: 'Añadir red',
  //     inputs: [
  //       {
  //         name: 'Nombre de red',
  //         type: 'text',
  //         placeholder: 'Introducir nombre de red'
  //       }
  //     ],
  //     buttons: [

  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           let mensaje = 'Operación cancelada';
  //           this.alertConexFalse(mensaje);
  //         }
  //       }, {
  //         text: 'Conectar',
  //         handler: (data) => {
            
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  //   this.hotspot.addWifiNetwork(this.dataSSID, mode, data.txtpassword)
  //     .then((data) => {


  //     })

  // }
 
  async showDataRed() {
    const alert = await this.alertController.create({
      header: this.dataSSID,
      message: 'intensidad',
      buttons: ['OK']
    });
  }
  getConeccionActual(){
    this.hotspot.getConnectionInfo().then((data) => {
      this.dataSSID = data.SSID.substring(1, data.SSID.length - 1);
      this.dataIPAddress = data.IPAddress.substring(1);;
      this.datalinkSpeed = data.linkSpeed + "Mbps";
      this.dataSecurity = "WPA/WPA2 PSK";
    });
    this.getCoordenate();
  }
  async presentAlert(SSID: any) {
    const toast = await this.toastController.create({
      message: 'Conectando...',
      color:'tertiary',
    });
    const alert = await this.alertController.create({
      header: 'Red: '+SSID,
      inputs: [
        {
          name: 'txtpassword',
          type: 'password',
          placeholder: 'contraseña'
        }
        ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            let mensaje = 'Operación cancelada';
            this.alertConexFalse(mensaje);
          }
        }, {
          text: 'Conectar',
          handler: (data) => {
            toast.present();
            var pass = data.txtpassword;
            this.hotspot.connectToWifi(SSID, data.txtpassword)
              .then((data) => {
                toast.dismiss();
                this.alertConex();
                this.getCoordenate();
                this.red = { tipoRed: 'wifi', nombreRed: SSID, passwordRed: pass, estadoRed: 1, latitud: this.latituds, longitud: this.longituds, idUser:1 };
                this.redesServices.addRed(this.red)
                  .then(data => {
                    console.log(data);
                  }, (error) => {
                    console.log(error);
                  });
              }, (error) => {
                  toast.dismiss();
                  let mensaje = 'Error al conectar';
                  this.alertConexFalse(mensaje);
              })
          }
        }
      ]
    });
    await alert.present();
  }
  
  goSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
  goToMapa(cont: string) {
    this.navCtrl.navigateForward(`mapa/${cont}`);
  }
  doRefresh(event) {
    this.getConeccionActual();
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.restarVacio(networks);
    }); setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  restarVacio(networks){
    this.data = networks;
    this.cont = networks.length;
    for (let datas of this.data) {
      if (datas.SSID == '') {
        this.cont = this.cont - 1;
      }
    }
  }
  async alertConex() {
    const toast = await this.toastController.create({
      message: 'Conectado',
      duration: 2000
    });
    toast.present();
  }
  async alertConexFalse(mensaje: any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  async displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type;
    const toast = await this.toastController.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 3000
    });
    toast.present();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  
  async getCoordenate(){
    const myLatLng = await this.getLocation();
    this.latituds = myLatLng.lng;
    this.longituds = myLatLng.lng;
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
  
  
}
