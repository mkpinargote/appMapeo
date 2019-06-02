import { Component, OnInit } from '@angular/core';
import { RedesService } from '../../app/api/red/redes.service';
import { LoadingController, Refresher } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-misredes',
  templateUrl: './misredes.page.html',
  styleUrls: ['./misredes.page.scss'],
})
export class MisredesPage implements OnInit {
  redesUser: any;
  estado: boolean;
  estadoCompartido: string;
  estadoCompartir: string;
  Iduser:any;
  contador: string;
  constructor(public redesServices: RedesService,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public alertController: AlertController,
    private hotspot: Hotspot,
    private route: ActivatedRoute,
    private storage: Storage ) {
    this.estadoCompartir = 'Compartir';
    this.estadoCompartido = 'Desvincular';
    this.contador = this.route.snapshot.paramMap.get('cont');
  }
  ngOnInit() {
   
    this.hotspot.isConnectedToInternet().then((data) => {
      if (data == true) {
        this.storage.get('id').then((val) => {
          this.Iduser = val;
          this.getMyredes(this.Iduser);
        });
      } else {
        this.AlertNotConexion()
      }
    });
  }
  async getMyredes(id:number) {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.redesServices.getRedesUser(id)
      .then(data => {
        loading.dismiss();
        this.redesUser = data;
      }, (error) => {
          loading.dismiss();
      })
  }
  doRefresh(event) {
    this.redesServices.getRedesUser(this.Iduser)
      .then(data => {
        event.target.complete();
        this.redesUser = data;
      });
  }
  loadData(event) {
    this.redesServices.getRedesUser(this.Iduser)
      .then(data => {
        event.target.complete();
        this.redesUser = this.redesUser.concat(data);
      });
  }
  async changeRedMapa(id: number, estadored: string) {
    let comparar;
    if (estadored == "0") {
      comparar = this.estadoCompartido;
    } else {
      comparar = this.estadoCompartir;
    }
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Desea ' + comparar + ' esta <strong>red</strong> en el mapa!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            debugger
            if (estadored == "1") {
              estadored = "0";
            } else {
              estadored = "1";
            }
            let datas = { 'estadored': estadored };
            this.redesServices.updateEstadoRed(id, datas)
              .then(data => {
                debugger
                this.getMyredes(this.Iduser);
              }, (error) => {
                debugger
      
              })
          }
        }
      ]
    });
    await alert.present();
  }
  async AlertNotConexion() {
    const alert1 = await this.alertController.create({
      header: 'Conexión',
      message: 'Se requiere conexión a internet',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

          }
        }
      ]
    });
    await alert1.present();
  }
  Misredes() {
    this.navCtrl.navigateForward(`misredes`);
  }
  goSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
  goToMapa() {
    this.navCtrl.navigateForward(`mapa/${this.contador}`);
  }
}
