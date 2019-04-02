import { Component, OnInit } from '@angular/core';
import { RedesService } from '../../app/api/red/redes.service';
import { LoadingController, Refresher } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { Storage } from '@ionic/storage';
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
  constructor(public redesServices: RedesService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    private hotspot: Hotspot,
    private storage: Storage ) {
    this.estadoCompartir = 'Compartir';
    this.estadoCompartido = 'Desvincular';
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
  async changeRedMapa(id: number, estadoRed: boolean) {
    let comparar;
    if (estadoRed == false) {
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
            if (estadoRed == true) {
              estadoRed = false;
            } else {
              estadoRed = true;
            }
            let datas = { 'estadoRed': estadoRed };
            this.redesServices.updateEstadoRed(id, datas)
              .then(data => {
                this.getMyredes(this.Iduser);
              });
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
}
