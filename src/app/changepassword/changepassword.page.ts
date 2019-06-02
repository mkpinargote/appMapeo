import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../../app/api/user/user.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  iduser: any;
  userActual: any;
  userNuevo: String;
  msg: String;
  constructor(private storage: Storage,
    public userService: UserService,
    public navCtrl: NavController,
    public toastController: ToastController,) { }

  ngOnInit() {
    this.storage.get('id').then((val) => {
      this.iduser = val;
    });
    this.storage.get('user').then((val) => {
      this.userActual = val;
    });
  }
  cancelar() {
    this.navCtrl.navigateForward(`perfil`);
  }
  async mensajeToast(mensaje: any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  } 
}
