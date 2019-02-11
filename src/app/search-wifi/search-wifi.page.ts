import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Subscription } from 'rxjs/Subscription';
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
  constructor(public alertController: AlertController,
     public navCtrl: NavController, 
     private hotspot: Hotspot,
     public toastController: ToastController,
     public loadingController: LoadingController,
     private network: Network) {}
  ngOnInit() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.restarVacio(networks);
    });
    this.hotspot.getConnectionInfo().then((data) => {
      this.dataSSID = data.SSID.substring(1, data.SSID.length-1);
      this.dataIPAddress= data.IPAddress.substring(1);;
      this.datalinkSpeed= data.linkSpeed +"Mbps";
      this.dataSecurity = "WPA/WPA2 PSK";
    });
    // this.hotspot.getNetConfig().then((data) => {
    //   debugger
    //   console.log("getNetConfig: " + data);
    // });
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
            this.hotspot.connectToWifi(SSID, data.txtpassword)
              .then((data) => {
                toast.dismiss();
                this.alertConex() ;    
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
}
