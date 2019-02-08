import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController  } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: "app-search-wifi",
  templateUrl: "./search-wifi.page.html",
  styleUrls: ["./search-wifi.page.scss"]
})
export class SearchWifiPage implements OnInit {
  data: any;
  cont: any;

  constructor(public alertController: AlertController,
     public navCtrl: NavController, 
     private hotspot: Hotspot,
     public toastController: ToastController,
     public loadingController: LoadingController) {}
  ngOnInit() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.restarVacio(networks);
    });
  }
  async presentAlert(SSID: any) {
    const loading = await this.loadingController.create();
    const alert = await this.alertController.create({
      header: 'Red: '+SSID,
      inputs: [
        {
          name: 'txtpassword',
          type: 'text',
          placeholder: 'contraseña'
        }],
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
            
              loading.present();
            this.hotspot.connectToWifi(SSID, data.txtpassword)
              .then((data) => {
                loading.dismiss();
                this.alertConex() ;    
              }, (error) => {
                  let mensaje = 'No se pudo conectar';
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

}
