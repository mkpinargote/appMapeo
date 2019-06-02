import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../../app/api/user/user.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-changeuser',
  templateUrl: './changeuser.page.html',
  styleUrls: ['./changeuser.page.scss'],
})
export class ChangeuserPage implements OnInit {
  iduser: any;
  userActual:any;
  userNuevo: String;
  msg:String;
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

  filterUser(){
    var txt = document.getElementById("msg1");
    if (this.userNuevo.length>=4){
      this.userService.filterNickname({ 'user': this.userNuevo })
        .then(data => {
          txt.style.backgroundColor = '#FFF0B2'
          txt.style.color='green';
  
          this.msg = 'Usuario disponible';
        }, (err) => {
            txt.style.color = 'red';

            this.msg ='Usuario existente';
        });
    }else{
      txt.style.backgroundColor = '#FFFFFF';
      this.msg = "";
    }

  }
  updatenickName(){
    this.userService.updateNickname(this.iduser, { 'user': this.userNuevo})
      .then(data => {
        this.storage.set('user', this.userNuevo);
        this.navCtrl.navigateForward(`perfil`);
        this.mensajeToast('Usuario actualizado');
      }, (err) => {
          this.mensajeToast('No se actualizó el usuario');
      });
  }
  cancelar(){
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
