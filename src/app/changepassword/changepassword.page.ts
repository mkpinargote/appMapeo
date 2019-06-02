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
  passRepit: String;
  passNew: String;
  passActual: String;
  msg: String;
  constructor(private storage: Storage,
    public userService: UserService,
    public navCtrl: NavController,
    public toastController: ToastController,) { }

  ngOnInit() {
    this.storage.get('id').then((val) => {
      this.iduser = val;
    });
  }
  updatePassword() {
    var txt = document.getElementById("msg1");
    if(this.passNew== this.passRepit){
      document.getElementById("rp").style.border = '1px solid #DBDBDB';
      document.getElementById("np").style.border = '1px solid #DBDBDB';
      this.msg = '';
      this.userService.updatePass(this.iduser, { 'curentpassword': this.passActual, 'newpassword': this.passNew })
        .then(data => {
          this.navCtrl.navigateForward(`perfil`);
          this.mensajeToast('Contraseña actualizada');
        }, (err) => {
          this.mensajeToast('No se actualizó la contraseña');
        });
    }else{
      document.getElementById("rp").style.border ='1px solid #E94040';
      document.getElementById("np").style.border = '1px solid #E94040';
      txt.style.color = 'red';
      this.msg = 'Contraseñas no coinciden';
    }
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
