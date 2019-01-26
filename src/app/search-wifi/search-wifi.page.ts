import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController  } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: "app-search-wifi",
  templateUrl: "./search-wifi.page.html",
  styleUrls: ["./search-wifi.page.scss"]
})
export class SearchWifiPage implements OnInit {
  data: any;
  contador: any;
  constructor(public alertController: AlertController, public navCtrl: NavController, private hotspot: Hotspot) {}
  ngOnInit() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.restarVacio(networks);
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Red',
      message: 'Desea guardar esta red?',
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
             console.log(data);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewDidLoad() {}
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
    this.contador = networks.length;
    for (let datas of this.data) {
      if (datas.SSID == '') {
        this.contador = this.contador - 1;
      }
    }
  }
}
