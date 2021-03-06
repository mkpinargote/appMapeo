import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RedesService } from '../../app/api/red/redes.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: "app-search-wifi",
  templateUrl: "./search-wifi.page.html",
  styleUrls: ["./search-wifi.page.scss"]
})
export class SearchWifiPage implements OnInit {
  data: any;
  cont: any;
  dataSSID: any;
  dataIPAddress: any;
  datalinkSpeed: any;
  dataSecurity: any;
  redes: any;
  red: any = {};
  latituds: any;
  longituds: any;
  Iduser: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    private hotspot: Hotspot,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private network: Network,
    public menuCtrl: MenuController,
    public redesServices: RedesService,
    private geolocation: Geolocation,
    private storage: Storage) { }
  ngOnInit() {
    this.getConeccionActual();
    this.getCoordenate();
    //startWifiPeriodicallyScan
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.restarVacio(networks);
    });
    this.storage.get('id').then((val) => {
      this.Iduser = val;
    });
  }
  async addRed(){
    const alert = await this.alertController.create({
      header: 'Agregar red',
      inputs: [
        {
          name: 'red',
          type: 'text',
          placeholder: 'Nombre de la red'
        },
        {
          name: 'contra',
          type: 'password',
          placeholder: 'Ingrese la contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            let mensaje = 'Operación cancelada';
            this.alertConex(mensaje);
          }
        }, {
          text: 'Conectar',
          handler: (datas) => {
            this.hotspot.connectToWifi(datas.red, datas.contra)
              .then((data) => {
                this.alertConex('Conectado');
                this.getConeccionActual();
                this.red = { tipoRed: 'wifi', nombreRed: datas.red, passwordRed: datas.contra, estadoRed: 1, latitud: this.latituds, longitud: this.longituds, idUser: this.Iduser };
                this.redesServices.addRed(this.red)
                  .then(data => {
                    this.alertConex("Red guardada");
                  }, (error) => {
                    this.alertConex("No se puedo guardar la red");
                  });
              }, (error) => {
                this.alertConex('Error al conectar');
              })
          }
        }
      ]
    });
    await alert.present();
   }
  //Muestra el detalle de la red como ip, frecuencia .....
  async showDataRed() {
    const alert = await this.alertController.create({
      header: this.dataSSID,
      message: '<strong>Intensidad de señal: </strong></br>' + this.datalinkSpeed + '</br><strong>Seguridad: </strong></br>' + this.dataSecurity + '</br><strong>IP: </strong></br>' + this.dataIPAddress,
      buttons: [{ text: 'Ok' }]
    });
    await alert.present();
  }
  //obtiene la información de la red actual conectada
  getConeccionActual() {
    this.hotspot.getConnectionInfo().then((data) => {
      this.dataSSID = data.SSID.substring(1, data.SSID.length - 1);
      this.dataIPAddress = data.IPAddress.substring(1);;
      this.datalinkSpeed = data.linkSpeed + "Mbps";
      this.dataSecurity = "WPA/WPA2 PSK";
    });
  }
  //para conectarme a una red mapeada 
  async presentAlert(SSID: any) {
    const toast = await this.toastController.create({
      message: 'Conectando...',
      color: 'tertiary',
    });
    const alert = await this.alertController.create({
      header: 'Red: ' + SSID,
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
            this.alertConex('Operación cancelada');
          }
        }, {
          text: 'Conectar',
          handler: (data) => {
            toast.present();
            var pass = data.txtpassword;
            //con este método me conecto a la red 
            this.hotspot.connectToWifi(SSID, data.txtpassword)
              .then((data) => {
                toast.dismiss();
                this.alertConex('Conectado');
                this.getConeccionActual();
                this.red = { tipoRed: 'wifi', nombreRed: SSID, passwordRed: pass, estadoRed: 1, latitud: this.latituds, longitud: this.longituds, idUser: this.Iduser };
                this.redesServices.addRed(this.red)
                  .then(data => {
                    this.alertConex("Red guardada");
                  }, (error) => {
                    this.alertConex("No se puedo guardar la red");
                  });
              }, (error) => {
                toast.dismiss();
                this.alertConex('Error al conectar');
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
  //para refrescar la busqueda de ñas redews 
  doRefresh(event) {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.restarVacio(networks);
    }); setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  //restar redes sin nombre
  restarVacio(networks) {
    this.data = networks;
    this.cont = networks.length;
    for (let datas of this.data) {
      if (datas.SSID == '') {
        this.cont = this.cont - 1;
      }
    }
  }
  //para presentar mensaje
  async alertConex(mensaje: any) {
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
  //para inahabilitarvel menu 
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  //obtener coordenadas
  async getCoordenate() {
    const myLatLng = await this.getLocation();
    this.latituds = myLatLng.lat;
    this.longituds = myLatLng.lng;
  }
  //obtener coordenadas método mapa
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(1);
  }

  Misredes(cont: string) {
    this.navCtrl.navigateForward(`misredes/${cont}`);
  }
}
