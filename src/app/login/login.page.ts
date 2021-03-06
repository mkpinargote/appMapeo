import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController, ActionSheetController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertOptions } from '@ionic/core';
import { UserService } from '../../app/api/user/user.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit {
  formularioLogin:FormGroup;
  data:any={};
  msgdata:any;
  constructor(public actionSheetController: ActionSheetController,  public navCtrl1: NavController,
              public alertCtrl: AlertController,
              private alertController: AlertController,
              private fb: FormBuilder,
              public navCtrl: NavController,
              public menuCtrl: MenuController,
              public userService: UserService,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public toastController: ToastController,
  ) {
    this.buildForm();
  }
  async logins() {
    const loading = await this.loadingCtrl.create({
      message: 'iniciando...',
    });
    await loading.present();
    this.userService.loginUser(this.data)
      .then(data => {
        this.storage.set('user', data['user']);
        this.storage.set('id', data['userId']);
        loading.dismiss();
        this.goSearchWifi();
      }, (err) => {
        loading.dismiss();
          this.mensajeToast(err.error['message']);
      });
  }
  goSearchWifi() {
    this.navCtrl.navigateForward(`buscarredes`);
  }
  buildForm() {
    this.formularioLogin = this.fb.group({
      user:['',[Validators.required,Validators.maxLength(10)]],
      passsword:['',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]]
      });
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ngOnInit() {
  }
  async mensajeToast(mensaje: any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  } 
}
  