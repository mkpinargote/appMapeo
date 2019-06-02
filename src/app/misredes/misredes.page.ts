import { Component, OnInit } from '@angular/core';
import { RedesService } from '../../app/api/red/redes.service';
import { LoadingController, Refresher } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    public toastController: ToastController,
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

  async dleteMyred(id: any) {
    const loading = await this.alertController.create({
      header: 'Eliminar red',
      message: 'Está seguro de eliminar la red?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alertConex('Operación cancelada');
          }
        }, {
          text: 'Eliminar',
          handler: (data) => {
            this.redesServices.deleteRedes(id)
              .then(data => {
                loading.dismiss();
                this.alertConex("red eliminada");
                this.getMyredes(this.Iduser);
              }, (error) => {
                this.alertConex("error al eliminar la red");
                loading.dismiss();
              })
          }
        }
      ]
    });
    await loading.present();
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
          this.alertConex("error al cargar tus red");
      })
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
            if (estadored == "1") {
              estadored = "0";
            } else {
              estadored = "1";
            }
            let datas = { 'estadored': estadored };
            this.redesServices.updateEstadoRed(id, datas)
              .then(data => {
                this.getMyredes(this.Iduser);
              }, (error) => {
      
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
  async alertConex(mensaje: any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
